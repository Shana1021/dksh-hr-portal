import clientPromise from "@/lib/mongodb";
import HRProfileForm from "./HRProfileForm";

export default async function HREmployee({ params }) {
  if (params.id === "New") {
    return <HRProfileForm />;
  }

  const client = await clientPromise;
  const db = await client.db();
  const hrProfile = await db.collection("hr_profiles").findOne({ _id: params.id });

  return <HRProfileForm hrProfile={hrProfile} />;
}