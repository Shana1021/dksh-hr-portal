import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sgMailSend from "@/lib/sendgrid";

export async function GET() {
  console.log("Weekly cron is running...");

  const client = await clientPromise;
  const db = await client.db();

  const cutOffDate = new Date();
  cutOffDate.setHours(0, 0, 0, 0);
  cutOffDate.setDate(cutOffDate.getDate() - 90);

  const [probationaries, settings] = await Promise.all([
    db.collection("probationary")
      .aggregate([
        {
          $match: { completed: false, createdAt: { $gte: cutOffDate } }
        },
        {
          $lookup: {
            from: "employee_profiles",
            localField: "_id",
            foreignField: "_id",
            as: "profile"
          }
        }
      ])
      .map(doc => ({ ...doc, profile: doc.profile[0] }))
      .sort({ createdAt: 1 })
      .toArray(),
    db.collection("settings").findOne()
  ]);

  await sgMailSend(
    settings.hrTeamEmailAddress,
    "d-7f6deead24844a61a50b01be38f1105a",
    {
      probationaries: probationaries
        .map(probationary => {
          const endDate = new Date(probationary.createdAt.valueOf());
          endDate.setDate(endDate.getDate() + 90);
          const differenceMillis = Math.max(0, endDate - new Date());
          
          return {
            employee: probationary.profile,
            daysLeft: Math.ceil(differenceMillis / 1000 / 60 / 60 / 24)
          };
        })
    }
  );

  return NextResponse.json({ status: "success" });
}