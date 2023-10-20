import clientPromise from "@/lib/mongodb";
import VendorForm from "../VendorForm";

export default async function Vendor({ params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  const vendor = await db.collection("vendors").findOne({ _id: id });

  return <VendorForm vendor={vendor} />;
}