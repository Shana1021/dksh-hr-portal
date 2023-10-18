import clientPromise from "@/lib/mongodb";

export async function DELETE(_, { params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();
  
  if (await db.collection("training").countDocuments({ vendor: id }) > 0) {
    return NextResponse.json({ status: "referencesFound" });
  }

  await db.collection("vendors").deleteOne({ _id: id });

  return NextResponse.json({ status: "success" });
}