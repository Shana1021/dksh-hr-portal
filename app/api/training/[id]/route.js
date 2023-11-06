import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(_, { params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  await db.collection("trainings").deleteOne({ _id: new ObjectId(id), status: "Approved" });
  
  return NextResponse.json({ status: "success" });
}