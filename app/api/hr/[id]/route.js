import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {
  const formData = await request.formData();
  
  const client = await clientPromise;
  const db = await client.db();

  if (formData.get("profileImage").size > 0) {
    const bucket = new GridFSBucket(db, { bucketName: "hr_profile_images" });

    const file = (await bucket.find({ filename: params.id }).toArray())[0];
    if (file) {
      await bucket.delete(file._id);
    }

    Readable.from(Buffer.from(await formData.get("profileImage").arrayBuffer()))
      .pipe(bucket.openUploadStream(formData.get("_id")));
  }

  const password = formData.get("password").length > 0 && bcrypt.hashSync(formData.get("password"), 12);

  await db.collection("hr_profiles").updateOne({ _id: params.id },
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
        ...(password && { password })
      }
    }
  );

  return NextResponse.json({ status: "success" });
}

export async function DELETE(_, { params }) {
  const client = await clientPromise;
  const db = await client.db();

  const bucket = new GridFSBucket(db, { bucketName: "hr_profile_images" });

  const file = (await bucket.find({ filename: params.id }).toArray())[0];
  if (file) {
    await bucket.delete(file._id);
  }
  
  await db.collection("hr_profiles").deleteOne({ _id: params.id });

  return NextResponse.json({ status: "success" });
}