import OffboardingChecklistPage from "./OffboardingChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function OffboardingChecklist() {
  const client = await clientPromise;
  const db = await client.db();
  

  
  return <OffboardingChecklistPage offboardingChecklists={[]} />
}