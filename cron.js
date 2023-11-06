require("dotenv").config({ path: ".env.local" });
const cron = require("node-cron");

// Schedules a job that runs everyday at 08:00 in the morning.
cron.schedule("0 8 * * *", () => {
  fetch(`${process.env.NEXTAUTH_URL}api/onboarding`);
});

// Schedules a job that runs every Monday at 08:00 in the morning.
cron.schedule("0 8 * * 1", () => {
  fetch(`${process.env.NEXTAUTH_URL}api/cron/weekly`);
});