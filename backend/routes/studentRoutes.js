const express = require("express");
const studentPostController = require("../controllers/student/studentPostController");
const getStudentDetails = require("../controllers/student/studentdetails");
const particularStudentController = require("./../controllers/student/particularStudentController");
const updateStudent = require("../controllers/student/updateStudent");
const deleteStudent = require("../controllers/student/deleteStudent");
const { updateCronSchedule } = require("../services/cfCronService");

const syncMeta = require("../models/syncMeta");
const router = express.Router();

router.post("/postStudentDetail", studentPostController);
router.get("/getAllStudents", getStudentDetails);
router.get("/particularStudent/:studentId", particularStudentController);
router.put("/updateStudent/:id", updateStudent);
router.delete("/deleteStudent/:id", deleteStudent);
router.post("/update-cron", (req, res) => {
  const { schedule } = req.body; // e.g., "0 4 * * *" for 4 AM
  updateCronSchedule(schedule);
  res.json({ message: `Cron updated to ${schedule}` });
});
// in routes/test.js or index.js temporarily
router.get("/test-fetch", async (req, res) => {
  const { fetchAndUpdateAllStudents } = require("./../services/cfFetcher");
  await fetchAndUpdateAllStudents();
  res.send("Manual fetch and email run completed.");
});
router.get("/last-sync", async (req, res) => {
  try {
    const meta = await syncMeta.findOne({});
    res.json({ lastSynced: meta?.lastSynced || null });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch last synced time." });
  }
});

module.exports = router;
