import clientPromise from "@/lib/mongodb";
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
      db.collection("training").countDocuments({ "vendor._id": formData.get("vendorCode") })
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

  await db.collection("training").insertOne({
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
    createdAt: new Date()
  });

  return NextResponse.json({ status: "success" });
}