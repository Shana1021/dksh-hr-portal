import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request) {
  const updates = await request.json();
  if (updates.length === 0) {
    return NextResponse.json({ status: "success" });
  }

  try {
    const client = await clientPromise;
    const db = await client.db();

    const employeeProfiles = await db.collection("employee_profiles")
      .find({ _id: { $in: updates.map(update => update._id) } }, { _id: true, status: true })
      .toArray();
    
    const statuses = Object.fromEntries(
      employeeProfiles.map(employeeProfile => [employeeProfile._id, employeeProfile.status])
    );

    await db.collection("onboarding_checklist").bulkWrite(
      updates
        .filter(update => statuses[update._id] === "Pending" && update.status === "Pass")
        .map(update => ({
          updateOne: {
            filter: { _id: update._id },
            update: {
              $set: {
                todos: [
                  {
                    title: "1 Hour Introduction",
                    checked: false
                  },
                  {
                    title: "Office Tour",
                    checked: false
                  }
                ],
                items: []
              },
              $currentDate: { createdAt: true }
            },
            upsert: true
          }
        }))
    );

    await db.collection("employee_profiles").bulkWrite(
      updates
        .map(update => ({
          updateOne: {
            filter: { _id: update._id },
            update: {
              $set: {
                status: update.status
              }
            }
          }
        }))
    );

    // TODO: send email for those who passed

    return NextResponse.json({ status: "success" });
  } catch (e) {
    return NextResponse.json({ error: e.toString() }, { status: 500 });
  }
}