import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import bcrypt from "bcrypt";

export async function POST(request) {
  const formData = await request.formData();
    
  const client = await clientPromise;
  const db = await client.db();

  if (await db.collection("hr_profiles").findOne({ _id: formData.get("_id") }, { _id: true })) {
    return NextResponse.json({ status: "idExists" });
  }
  
  if (formData.get("profileImage").size > 0) {
    const bucket = new GridFSBucket(db, { bucketName: "hrProfileImages" });

    Readable.from(Buffer.from(await formData.get("profileImage").arrayBuffer()))
      .pipe(bucket.openUploadStream(formData.get("_id")));
  }

  const password = bcrypt.hashSync(formData.get("password"), 12);

  await db.collection("hr_profiles").updateOne(
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
        password
      },
      $currentDate: { createdAt: true }
    },
    { upsert: true }
  );

  return NextResponse.json({ status: "success" });
}