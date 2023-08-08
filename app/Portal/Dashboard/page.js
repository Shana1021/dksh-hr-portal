import clientPromise from "@/lib/mongodb";
import Dashboard from "./Dashboard.js";

export default async function DashboardPage() {
  const client = await clientPromise;
  const db = client.db("hr_portal");
  const data = await db.collection("test").find().toArray();

  return (
    <Dashboard data={data.map(d => ({ ...d, _id: d._id.toString() }))} />
  )
}
