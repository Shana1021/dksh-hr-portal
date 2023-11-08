import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import fs from "fs";

export async function GET(_, { params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  const bucket = new GridFSBucket(db, { bucketName: "employee_profile_images" });

  const file = (await bucket.find({ filename: id }).toArray())[0];
  if (!file) {
    return new NextResponse(fs.createReadStream(process.env.NODE_ENV === "development" ? "public/user.png" : "user.png"), {
      headers: {
        "Content-Type": "image/png"
      }
    });
  }

  return new NextResponse(bucket.openDownloadStream(file._id), {
    headers: {
      "Content-Type": file.contentType
    }
  });
}