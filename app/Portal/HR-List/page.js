import HRListPage from "./HRPage";
import clientPromise from "@/lib/mongodb";

export default async function HRPageFetch() {
  const client = await clientPromise;
  const db = await client.db();
  let hrProfiles = await db.collection("hrstaffs").find().toArray();
  for (const hrProfile of hrProfiles) {
    hrProfile._id = hrProfile._id.toString();
  }

  return (
    <>
      <HRListPage hrProfiles={hrProfiles} />
    </>
  );
}
