import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
  const {
    title,
    address1,
    address2,
    code,
    city,
    state,
    country,
    date,
    time,
    hours,
    fee,
    vendorName,
    vendorNameCode,
    venderEmail,
    venderNumber,
    E_name,
    E_email,
  } = await request.json();
  const client = await clientPromise;
  const db = await client.db();
  const collection = db.collection("training");
  const currentDate = new Date();
  const timestamp = formatDate(currentDate);
  await collection.insertOne({
    title,
    address1,
    address2,
    code,
    city,
    state,
    country,
    date,
    time,
    hours,
    fee,
    vendorName,
    venderNumber,
    venderEmail,
    vendorNameCode,
    E_name,
    E_email,
    timestamp,
  });
  return NextResponse.json({ message: "Training Created" }, { status: 201 });
}
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("training");
  const TrainingList = await collection.find().toArray();
  return NextResponse.json({ TrainingList });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id").trim();

  const client = await clientPromise;
  const db = await client.db();
  const collection = db.collection("training");
  await collection.deleteOne({ _id: new ObjectId(id) });

  return new NextResponse(JSON.stringify({ message: "Document deleted" }), {
    status: 200,
  });
}
