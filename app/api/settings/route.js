import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();
  
  await db.collection("settings").updateOne({}, {
    $set: {
      itTeamEmailAddress: formData.get("itTeamEmailAddress"),
      adminTeamEmailAddress: formData.get("adminTeamEmailAddress"),
      hrTeamEmailAddress: formData.get("hrTeamEmailAddress"),
    },
  });

  return NextResponse.json({ status: "success" });
}
