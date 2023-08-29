import ChecklistPage from "./ChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function ChecklistPageFetch() {
  const client = await clientPromise;
  const db = await client.db("hr_portal"); // Change the database name
  let checklistItems = await db.collection("offboarding_checklist").find().toArray();
  for (const item of checklistItems) {
    item._id = item._id.toString();
  }
  
  return <ChecklistPage checklistItems={checklistItems} />;
}