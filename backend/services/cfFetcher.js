// services/cfFetcher.js
const axios = require("axios");
const Student = require("../models/studentModel");
const sendReminderEmail = require("./sendReminderEmail"); // create this utility
const syncMeta = require("./../models/syncMeta");
const fetchCFData = async (handle) => {
  try {
    const [statusRes, ratingRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}`),
      axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`),
    ]);
    return {
      submissions: statusRes.data.result,
      ratingHistory: ratingRes.data.result,
      lastUpdated: new Date(),
    };
  } catch (err) {
    console.error(`Failed fetching for ${handle}:`, err.message);
    return null;
  }
};

const fetchAndUpdateAllStudents = async () => {
  const students = await Student.find({ cfHandle: { $exists: true, $ne: "" } });

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (const student of students) {
    const cfData = await fetchCFData(student.cfHandle);
    if (cfData) {
      const submissions = cfData.submissions || [];
      let latestSubmissionDate = student.lastCFSubmission;

      if (submissions.length > 0) {
        const latestSubmission = submissions[0]; // Most recent comes first
        latestSubmissionDate = new Date(
          latestSubmission.creationTimeSeconds * 1000
        );
      }

      // Inactivity check
      if (
        student.autoEmailEnabled &&
        (!latestSubmissionDate || latestSubmissionDate < sevenDaysAgo)
      ) {
        try {
          await sendReminderEmail(student.email, student.name);
          student.reminderCount = (student.reminderCount || 0) + 1;
          console.log(`Reminder email sent to ${student.name}`);
        } catch (err) {
          console.error(
            `Failed to send email to ${student.name}:`,
            err.message
          );
        }
      }

      // Update student data
      await Student.findByIdAndUpdate(student._id, {
        cfData,
        lastUpdated: cfData.lastUpdated,
        lastCFSubmission: latestSubmissionDate || null,
        reminderEmailCount: student.reminderCount,
      });
    }
  }
  await SyncMeta.findOneAndUpdate(
    {},
    { lastSynced: new Date() },
    { upsert: true, new: true }
  );
};

module.exports = { fetchCFData, fetchAndUpdateAllStudents };
