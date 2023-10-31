import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import { NextResponse } from "next/server";
import sgMailSend from "@/lib/sendgrid";

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
      createdAt: new Date()
    });

    const [employeeProfile, settings] = await Promise.all([
      db.collection("employee_profiles").findOne({ _id: id }),
      db.collection("settings").findOne()
    ]);

    await Promise.all([
      sgMailSend(
        employeeProfile.email,
        "d-49fbb147b8fb4bd79047b2073f55561c",
        {
          employee: employeeProfile,
          employeeAcknowledgementUrl: `${process.env.NEXTAUTH_URL}EmployeeAcknowledgement/${encodeURIComponent(insertedId)}`
        }
      ),
      sgMailSend(
        formData.get("managerEmail"),
        "d-0b9e7c530607413db13eb4d95fdfdf0e",
        {
          employee: employeeProfile,
          reason: resignationRequest.reason
        }
      ),
      sgMailSend(
        settings.hrTeamEmailAddress,
        "d-b7435aa7ad374599a5c791c3c8fb0efb",
        {
          employee: employeeProfile,
          reason: resignationRequest.reason
        }
      )
    ]);
  }

  return NextResponse.json({ status: "success" });
}