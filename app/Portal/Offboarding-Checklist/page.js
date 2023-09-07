import ChecklistPage from "./ChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function ChecklistPageFetch() {
  const client = await clientPromise;
  const db = await client.db();

  const offboardingChecklist = (await db.collection("offboarding_checklist").find().toArray())
    .map(item => ({ ...item, _id: item._id.toString() }));
  const todoChecklist = (await db.collection("cl_offboarding_todos").find().toArray())
    .map(todo => ({ _id: todo._id.toString() }));
  const itemChecklist = (await db.collection("cl_items").find().toArray())
    .map(item => ({ _id: item._id.toString() }));
  
  return (
    <ChecklistPage
      offboardingChecklist={offboardingChecklist}
      todoChecklist={todoChecklist}
      itemChecklist={itemChecklist}
    />
  );
}