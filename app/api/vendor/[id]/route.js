import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, { params: { id } }) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();
  
  await db.collection("trainings").updateOne(
    { _id: new ObjectId(id), status: "Approved" },
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