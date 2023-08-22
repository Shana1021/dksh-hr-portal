import HRPage from "./HRPage";
import clientPromise from "@/lib/mongodb";

export default async function HRPageFetch() {
  const client = await clientPromise;
  const db = await client.db("hr_portal");
  let hrProfiles = await db.collection("hr_profiles").find().toArray();
  for (const hrProfile of hrProfiles) {
    hrProfile._id = hrProfile._id.toString();
  }
  
  return <HRPage hrProfiles={hrProfiles} />;
}