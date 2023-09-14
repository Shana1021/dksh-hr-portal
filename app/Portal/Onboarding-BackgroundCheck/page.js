import OnboardingBackgroundCheckPage from "./OnboardingBackgroundCheckPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingBackgroundCheck({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();
  const employeeProfiles = await db.collection("employee_profiles")
    .find().skip((page - 1) * pageSize).limit(pageSize).toArray();
  for (const employeeProfile of employeeProfiles) {
    employeeProfile._id = employeeProfile._id.toString();
  }

  const totalRows = await db.collection("employee_profiles").count();
  
  return (
    <OnboardingBackgroundCheckPage employeeProfiles={employeeProfiles} totalRows={totalRows} />
  )
}