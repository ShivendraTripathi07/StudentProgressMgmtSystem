const cron = require("node-cron");
const { fetchAndUpdateAllStudents } = require("./cfFetcher.js");
const CronConfig = require("../models/cronModel.js");

let cronJob;

// Default fallback schedule
const defaultSchedule = "0 2 * * *";

// Load from DB and start job
const startCronJob = async () => {
  let schedule = defaultSchedule;

  const config = await CronConfig.findOne();
  if (config && config.schedule) {
    schedule = config.schedule;
  }

  if (cronJob) cronJob.stop();
  cronJob = cron.schedule(schedule, async () => {
    console.log(`[CRON] Running scheduled CF data sync at ${schedule}`);
    await fetchAndUpdateAllStudents();
  });

  console.log(`[CRON] Job started with schedule: ${schedule}`);
};

// Update schedule and persist to DB
const updateCronSchedule = async (newSchedule) => {
  if (cronJob) cronJob.stop();

  cronJob = cron.schedule(newSchedule, async () => {
    console.log(`[CRON] Running scheduled CF data sync at ${newSchedule}`);
    await fetchAndUpdateAllStudents();
  });

  await CronConfig.findOneAndUpdate(
    {},
    { schedule: newSchedule },
    { upsert: true, new: true }
  );

  console.log(`[CRON] Schedule updated to: ${newSchedule}`);
};

module.exports = { startCronJob, updateCronSchedule };
