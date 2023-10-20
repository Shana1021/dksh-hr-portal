import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();

  if (await db.collection("probationary").countDocuments({ _id: formData.get("employeeId") }) === 0) {
    return NextResponse.json({ status: "employeeIdDoesNotExist" });
  }

  let vendor;
  if (formData.get("vendorChoice") === "Existing Vendor") {
    if (await db.collection("vendors").countDocuments({ _id: formData.get("vendorCode") }) === 0) {
      return NextResponse.json({ status: "vendorCodeDoesNotExist" });
    }

    vendor = formData.get("vendorCode");
  } else if (formData.get("vendorChoice") === "New Vendor") {
    const [vendorCount, trainingCount] = await Promise.all([
      db.collection("vendors").countDocuments({ _id: formData.get("vendorCode") }),
      db.collection("trainings").countDocuments({ "vendor._id": formData.get("vendorCode") })
    ]);

    if (vendorCount > 0 || trainingCount > 0) {
      return NextResponse.json({ status: "vendorCodeAlreadyExists" });
    }

    const vendorObj = {
      _id: formData.get("vendorCode"),
      name: formData.get("vendorName"),
      email: formData.get("vendorEmail"),
      phone: formData.get("vendorPhone")
    };

    if (formData.get("addVendor") === "on") {
      const { insertedId } = await db.collection("vendors").insertOne({
        ...vendorObj,
        createdAt: new Date()
      });

      vendor = insertedId;
    } else {
      vendor = vendorObj;
    }
  } else {
    vendor = null;
  }

  await db.collection("trainings").insertOne({
    title: formData.get("title"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    postalCode: formData.get("postalCode"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    datetime: formData.get("datetime"),
    totalHours: formData.get("totalHours"),
    fee: formData.get("fee"),
    employeeId: formData.get("employeeId"),
    vendor,
    status: "Pending",
    createdAt: new Date()
  });

  // TODO: send email to manager

  return NextResponse.json({ status: "success" });
}

export async function PUT(request) {
  const updates = await request.json();
  if (updates.length === 0) {
    return NextResponse.json({ status: "success" });
  }

  const client = await clientPromise;
  const db = await client.db();
  
  const trainings = await db.collection("trainings")
    .find({ _id: { $in: updates.map(id => new ObjectId(id)) } }, { status: true })
    .map(doc => [doc._id, doc.status])
    .toArray();
  
  const statuses = Object.fromEntries(trainings);

  const validUpdates = updates.filter(id => statuses[id] === "Approved");
  if (validUpdates.length === 0) {
    return NextResponse.json({ status: "success" });
  }

  await db.collection("trainings").bulkWrite(
    validUpdates.map(id => ({
      updateOne: {
        filter: { _id: new ObjectId(id), status: "Approved" },
        update: {
          $set: {
            status: "Complete"
          }
        }
      }
    }))
  );

  // TODO: send emails to managers

  return NextResponse.json({ status: "success" });
}