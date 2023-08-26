import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(_, { params }) {
  const client = await clientPromise;
  const db = await client.db("hr_portal");
  await db.collection("employee_profiles").deleteOne({_id: new ObjectId(params.id)});

  return NextResponse.json({});
}