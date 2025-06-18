// services/cfCronService.js
const cron = require("node-cron");
const { fetchAndUpdateAllStudents } = require("./cfFetcher.js");

let cronSchedule = "0 2 * * *"; // 2 AM daily
let cronJob;

const startCronJob = (schedule = cronSchedule) => {
  if (cronJob) cronJob.stop(); // Stop existing job if any
  cronJob = cron.schedule(schedule, async () => {
    console.log("[CRON] Running scheduled CF data sync...");
    await fetchAndUpdateAllStudents();
  });
};

const updateCronSchedule = (newSchedule) => {
  cronSchedule = newSchedule;
  startCronJob(newSchedule);
};
module.exports = { startCronJob, updateCronSchedule };
