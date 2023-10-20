import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params: { id } }) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();
  
  await db.collection("vendors").updateOne(
    { _id: id },
    {
      $set: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone")
      }
    }
  );
  
  return NextResponse.json({ status: "success" });
}