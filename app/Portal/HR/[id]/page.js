import clientPromise from "@/lib/mongodb";
import HRProfileForm from "../HRProfileForm";

export default async function HR({ params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  const hrProfile = await db.collection("hr_profiles").findOne({ _id: id });

  return <HRProfileForm hrProfile={hrProfile} />;
}