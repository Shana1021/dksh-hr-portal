import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

export async function PUT(request, { params: { id } }) {
  const formData = await request.formData();
  
  const client = await clientPromise;
  const db = await client.db();

  if (formData.get("profileImage").size > 0) {
    const bucket = new GridFSBucket(db, { bucketName: "employee_profile_images" });

    const file = (await bucket.find({ filename: id }).toArray())[0];
    if (file) {
      await bucket.delete(file._id);
    }

    Readable.from(Buffer.from(await formData.get("profileImage").arrayBuffer()))
      .pipe(bucket.openUploadStream(formData.get("_id")));
  }

  await db.collection("employee_profiles").updateOne(
    { _id: id },
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
        country: formData.get("country")
      }
    }
  );

  return NextResponse.json({ status: "success" });
}

export async function DELETE(_, { params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  if (await db.collection("employee_profiles").countDocuments({ _id: id, status: "Pending" }) === 0) {
    return NextResponse.json({ status: "notAllowed" });
  }

  const bucket = new GridFSBucket(db, { bucketName: "employee_profile_images" });

  const file = (await bucket.find({ filename: id }).toArray())[0];
  if (file) {
    await bucket.delete(file._id);
  }
  
  await db.collection("employee_profiles").deleteOne({ _id: id });

  return NextResponse.json({ status: "success" });
}