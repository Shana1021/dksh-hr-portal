import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
//Create
export async function POST(request) {
  const { fname, mname, lname } = await request.json();
  const client = await clientPromise;
  const db = await client.db("hr_portal");
  const collection = db.collection("hrstaffs");
  await collection.insertOne({ fname, mname, lname });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

//Read
export async function GET() {
  const client = await clientPromise;
  const db = await client.db("hr_portal");
  const collection = db.collection("hrstaffs");
  const staffList = await collection.find().toArray();
  return NextResponse.json({ staffList });
}
//Delete
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id").trim();
  const client = await clientPromise;
  const db = await client.db("hr_portal");
  const collection = db.collection("hrstaffs");
  await collection.deleteOne({ _id: new ObjectId(id) });

  return new NextResponse(JSON.stringify({ message: "Document deleted" }), {
    status: 200,
  });
}
