import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import { NextResponse } from "next/server";

export async function POST(request, { params: { id } }) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();

  const resignationRequest = await db.collection("resignation_requests").findOne({ _id: id });
  if (resignationRequest === null) {
    return NextResponse.json({ status: "idDoesNotExist" });
  }

  await db.collection("resignation_requests").deleteOne({ _id: id });

  if (formData.get("status") === "accept") {
    const bucket = new GridFSBucket(db, { bucketName: "acceptance_of_resignations" });

    Readable.from(Buffer.from(await formData.get("acceptanceLetter").arrayBuffer()))
      .pipe(bucket.openUploadStream(id));
    
    const { insertedId } = await db.collection("accepted_resignations").insertOne({
      employeeId: id,
      reason: resignationRequest.reason,
      annualLeaveBalance: formData.get("annualLeaveBalance"),
      managerEmail: formData.get("managerEmail"),
      createdAt: new Date()
    });

    // TODO: send emails
  }

  return NextResponse.json({ status: "success" });
}