import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newFname: fname,
    newMname: mname,
    newLname: lname,
  } = await request.json();

  const client = await clientPromise;
  const db = await client.db("hr_portal");
  const collection = db.collection("hrstaffs");

  const objectId = new ObjectId(id);

  await collection.updateOne(
    { _id: objectId },
    {
      $set: { fname, mname, lname },
    }
  );
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

// export async function GET(request, { params }) {
//   const id = params;
//   const client = await clientPromise;
//   const db = await client.db("hr_portal");
//   const collection = db.collection("hrstaffs");
//   const topic = await collection.findOne({ _id: id });
//   return NextResponse.json({ topic }, { status: 200 });
// }
