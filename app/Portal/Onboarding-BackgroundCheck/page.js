import OnboardingBackgroundCheckPage from "./OnboardingBackgroundCheckPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingBackgroundCheck() {
  const client = await clientPromise;
  const db = await client.db("hr_portal");
  const employeeProfiles = await db.collection("employee_profiles").find().toArray();
  for (const employeeProfile of employeeProfiles) {
    employeeProfile._id = employeeProfile._id.toString();
  }
  
  return <OnboardingBackgroundCheckPage employeeProfiles={employeeProfiles} />;
}