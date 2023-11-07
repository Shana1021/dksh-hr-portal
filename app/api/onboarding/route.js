import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import sgMailSend from "@/lib/sendgrid";

export async function POST(request) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();

  if (
    (await db
      .collection("employee_profiles")
      .countDocuments({ _id: formData.get("_id") }, { limit: 1 })) > 0
  ) {
    return NextResponse.json({ status: "idExists" });
  }

  if (formData.get("profileImage").size > 0) {
    const bucket = new GridFSBucket(db, {
      bucketName: "employee_profile_images",
    });

    Readable.from(
      Buffer.from(await formData.get("profileImage").arrayBuffer())
    ).pipe(bucket.openUploadStream(formData.get("_id")));
  }

  let dob = new Date(formData.get("dob"));
  if (isNaN(dob)) {
    dob = null;
  }

  await db.collection("employee_profiles").insertOne({
    _id: formData.get("_id"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    dob,
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
    bcStatus: "Pending",
    createdAt: new Date(),
  });

  return NextResponse.json({ status: "success" });
}

export async function PUT(request) {
  const updates = await request.json();
  if (updates.length === 0) {
    return NextResponse.json({ status: "success" });
  }

  const client = await clientPromise;
  const db = await client.db();

  const employeeProfiles = await db
    .collection("employee_profiles")
    .find(
      { _id: { $in: updates.map((update) => update._id) } },
      { bcStatus: true }
    )
    .map((doc) => [doc._id, doc.bcStatus])
    .toArray();

  const bcStatuses = Object.fromEntries(employeeProfiles);

  const validUpdates = updates.filter(
    (update) => bcStatuses[update._id] === "Pending"
  );
  if (validUpdates.length === 0) {
    return NextResponse.json({ status: "success" });
  }

  await db.collection("employee_profiles").bulkWrite(
    validUpdates.map((update) => ({
      updateOne: {
        filter: { _id: update._id },
        update: {
          $set: {
            bcStatus: update.bcStatus,
          },
        },
      },
    }))
  );

  const passedIds = validUpdates
    .filter((update) => update.bcStatus === "Pass")
    .map((update) => update._id);
  const failedIds = validUpdates
    .filter((update) => update.bcStatus === "Fail")
    .map((update) => update._id);
  
  if (passedIds.length > 0) {
    await Promise.all([
      db.collection("onboarding_checklists").insertMany(
        passedIds.map((_id) => ({
          _id,
          todos: [
            {
              title: "1 Hour Introduction",
              checked: false,
            },
            {
              title: "Office Tour",
              checked: false,
            },
          ],
          items: [
            {
              title: "Access Card",
              checked: false,
            },
            {
              title: "Laptop",
              checked: false,
            },
          ],
          completed: false,
          createdAt: new Date(),
        }))
      ),
      db.collection("probationary").insertMany(
        passedIds.map((_id) => ({
          _id,
          completed: false,
          createdAt: new Date(),
        }))
      )
    ]);
  }

  const [passedEmployees, failedEmployees, settings] = await Promise.all([
    db.collection("employee_profiles")
      .find({ _id: { $in: passedIds } })
      .toArray(),
    db.collection("employee_profiles")
      .find({ _id: { $in: failedIds } })
      .toArray(),
    db.collection("settings").findOne()
  ]);

  await Promise.all([
    sgMailSend(
      settings.itTeamEmailAddress,
      "d-4c01d07ecf7e44e6be4e4c877504df51",
      {
        employees: passedEmployees
      }
    ),
    sgMailSend(
      settings.adminTeamEmailAddress,
      "d-249feb6627db4dd7a674fea5b98d7c0f",
      {
        employees: passedEmployees
      }
    ),
    sgMailSend(
      settings.hrTeamEmailAddress,
      "d-dcfefff9005e419d998b40b24606e430",
      {
        passedEmployees,
        failedEmployees
      }
    )
  ]);

  return NextResponse.json({ status: "success" });
}
