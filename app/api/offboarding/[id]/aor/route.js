import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";

export async function GET(_, { params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  const bucket = new GridFSBucket(db, { bucketName: "acceptance_of_resignations" });

  const file = (await bucket.find({ filename: id }).toArray())[0];
  if (!file) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(bucket.openDownloadStream(file._id), {
    headers: {
      "Content-Type": file.contentType
    }
  });
}