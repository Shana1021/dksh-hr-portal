import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
//Create
export async function POST(request) {
  const {
    fname,
    lname,
    empId,
    password,
    address1,
    address2,
    email,
    gender,
    dob,
    country,
    city,
    state,
    position,
    department,
    code,
    number,
  } = await request.json();
  const client = await clientPromise;
  const db = await client.db();
  const collection = db.collection("hr_profiles");
  const currentDate = new Date();
  const timestamp = formatDate(currentDate);
  const hashedPassword = await bcrypt.hash(password, 10);
  await collection.insertOne({
    fname,
    lname,
    empId,
    password: hashedPassword,
    address1,
    address2,
    email,
    gender,
    dob,
    country,
    city,
    state,
    position,
    department,
    code,
    number,
    timestamp,
  });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}
// Read
export async function GET() {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const collection = db.collection("hr_profiles");
    const staffList = await collection.find().toArray();
    return NextResponse.json({ staffList });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error retrieving staff list",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

//Delete
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id").trim();

  const client = await clientPromise;
  const db = await client.db();
  const collection = db.collection("hr_profiles");
  await collection.deleteOne({ _id: new ObjectId(id) });

  return new NextResponse(JSON.stringify({ message: "Document deleted" }), {
    status: 200,
  });
}
