require("dotenv").config({ path: ".env.local" });
const cron = require("node-cron");
const clientPromise = require("./lib/mongodb");

// Schedules a job that runs everyday at 08:00.
cron.schedule("0 8 * * *", async () => {
  console.log("Cron is running...");

  const client = await clientPromise;
  const db = await client.db();

  const cutOffDate = new Date();
  cutOffDate.setHours(0, 0, 0, 0);
  cutOffDate.setDate(cutOffDate.getDate() - 89);
  
  await db.collection("probationary").updateMany(
    { completed: false, createdAt: { $lt: cutOffDate } },
    {
      $set: {
        completed: true
      }
    }
  );

  // TODO: send emails
});