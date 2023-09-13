import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newAddress1: address1,
    newAddress2: address2,
    newCode: code,
    newCity: city,
    newState: state,
    newCountry: country,
    newDate: date,
    newTime: time,
    newHours: hours,
    newFee: fee,
    newVendor: vendor,
    newVendorCode: vendorCode,
    newE_name: E_name,
    newE_email: E_email,
  } = await request.json();
  const client = await clientPromise;
  const db = await client.db();
  const collection = db.collection("training");
  const objectId = new ObjectId(id);

  await collection.updateOne(
    { _id: objectId },
    {
      $set: {
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
        vendor,
        vendorCode,
        E_name,
        E_email,
      },
    }
  );
  return NextResponse.json({ message: "Trainig updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const client = await clientPromise;
  const id = params;
  const objectId = new ObjectId(id);
  const db = await client.db();
  const collection = db.collection("training");
  const topic = await collection.findOne({ _id: objectId });
  return NextResponse.json({ topic }, { status: 200 });
}
