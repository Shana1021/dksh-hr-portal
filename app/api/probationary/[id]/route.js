import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request, { params }) {
  const client = await clientPromise;
  const db = await client.db();

  await db.collection("probationary").updateOne({ _id: params.id }, {
    $set: {
      completed: true
    }
  });

  return NextResponse.json({ status: "success" });
}