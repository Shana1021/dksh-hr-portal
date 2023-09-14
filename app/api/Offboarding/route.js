import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { date, E_name, E_id, E_email, message } = await request.json();
  const client = await clientPromise;
  const db = await client.db();
  const collection = db.collection("offboarding");
  const currentDate = new Date();
  const timestamp = formatDate(currentDate);
  await collection.insertOne({
    date,
    E_name,
    E_id,
    E_email,
    message,
    timestamp,
  });
  return NextResponse.json({ message: "Request Created" }, { status: 201 });
}
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("offboarding");
  const TrainingList = await collection.find().toArray();
  return NextResponse.json({ TrainingList });
}
