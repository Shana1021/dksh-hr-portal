import ChecklistPage from "./ChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function ChecklistPageFetch() {
  const client = await clientPromise;
  const db = await client.db(); // Change the database name
  let checklistItems = await db.collection("onboarding_checklist").find().toArray();
  for (const item of checklistItems) {
    item._id = item._id.toString();
  }
  
  return <ChecklistPage checklistItems={checklistItems} />;
}