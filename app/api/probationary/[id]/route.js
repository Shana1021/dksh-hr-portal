import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request, { params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  await db.collection("probationary").updateOne({ _id: id }, {
    $set: {
      completed: true
    }
  });

  return NextResponse.json({ status: "success" });
}