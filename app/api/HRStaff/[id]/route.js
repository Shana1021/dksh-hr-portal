import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";
export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newFname: fname,
    newLname: lname,
    newEmpId: empId,
    newAddress1: address1,
    newAddress2: address2,
    newEmail: email,
    newGender: gender,
    newDOB: dob,
    newCity: city,
    newCountry: country,
    newState: state,
    newPosition: position,
    newDepartment: department,
    newCode: code,
    newNumber: number,
  } = await request.json();
  const client = await clientPromise;
  const db = await client.db();
  const collection = db.collection("hr_profiles");
  const objectId = new ObjectId(id);

  await collection.updateOne(
    { _id: objectId },
    {
      $set: {
        fname,
        lname,
        empId,
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
      },
    }
  );
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}
export async function GET(request, { params }) {
  const client = await clientPromise;
  const id = params;
  const objectId = new ObjectId(id);
  const db = await client.db();
  const collection = db.collection("hr_profiles");
  const topic = await collection.findOne({ _id: objectId });
  return NextResponse.json({ topic }, { status: 200 });
}
