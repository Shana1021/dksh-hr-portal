import clientPromise from "@/lib/mongodb";
import HRProfileForm from "./HRProfileForm";

export default async function HREmployee({ params: { id } }) {
  if (id === "New") {
    return <HRProfileForm />;
  }

  const client = await clientPromise;
  const db = await client.db();
  const hrProfile = await db.collection("hr_profiles").findOne({ _id: id });

  return <HRProfileForm hrProfile={hrProfile} />;
}