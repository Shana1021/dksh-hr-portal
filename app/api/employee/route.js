import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

export async function POST(request) {
  const formData = await request.formData();
  
  const client = await clientPromise;
  const db = await client.db();

  if (await db.collection("employee_profiles").findOne({ _id: formData.get("_id") }, { _id: true })) {
    return NextResponse.json({ status: "idExists" });
  }
  
  if (formData.get("profileImage").size > 0) {
    const bucket = new GridFSBucket(db, { bucketName: "employeeProfileImages" });

    Readable.from(Buffer.from(await formData.get("profileImage").arrayBuffer()))
      .pipe(bucket.openUploadStream(formData.get("_id")));
  }
  
  await db.collection("employee_profiles").updateOne(
    { _id: formData.get("_id") },
    {
      $set: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        gender: formData.get("gender"),
        dob: formData.get("dob"),
        email: formData.get("email"),
        position: formData.get("position"),
        department: formData.get("department"),
        addressLine1: formData.get("addressLine1"),
        addressLine2: formData.get("addressLine2"),
        city: formData.get("city"),
        state: formData.get("state"),
        postalCode: formData.get("postalCode"),
        phone: formData.get("phone"),
        country: formData.get("country"),
        status: "Pending"
      },
      $currentDate: { createdAt: true }
    },
    { upsert: true }
  );

  return NextResponse.json({ status: "success" });
}

export async function PUT(request) {
  const updates = await request.json();
  if (updates.length === 0) {
    return NextResponse.json({ status: "success" });
  }
  
  const client = await clientPromise;
  const db = await client.db();

  const employeeProfiles = await db.collection("employee_profiles")
    .find({ _id: { $in: updates.map(update => update._id) } }, { _id: true, status: true })
    .toArray();
  
  const statuses = Object.fromEntries(
    employeeProfiles.map(employeeProfile => [employeeProfile._id, employeeProfile.status])
  );

  const validUpdates = updates.filter(update => statuses[update._id] === "Pending");
  if (validUpdates.length === 0) {
    return NextResponse.json({ status: "success" });
  }

  await db.collection("employee_profiles").bulkWrite(
    validUpdates.map(update => ({
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

  const passedUpdates = validUpdates.filter(update => update.status === "Pass");
  if (passedUpdates.length === 0) {
    return NextResponse.json({ status: "success" });
  }

  await Promise.all([
    db.collection("onboarding_checklists").bulkWrite(
      passedUpdates.map(update => ({
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
              items: [
                {
                  title: "Access Card",
                  checked: false
                },
                {
                  title: "Laptop",
                  checked: false
                }
              ]
            },
            $currentDate: { createdAt: true }
          },
          upsert: true
        }
      }))
    ),
    db.collection("probationary").bulkWrite(
      passedUpdates.map(update => ({
        updateOne: {
          filter: { _id: update._id },
          update: {
            $set: {
              completed: false
            },
            $currentDate: { createdAt: true }
          },
          upsert: true
        }
      }))
    )
  ]);

  // TODO: send email for those who passed

  return NextResponse.json({ status: "success" });
}