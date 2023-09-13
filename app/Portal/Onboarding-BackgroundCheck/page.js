import OnboardingBackgroundCheckPage from "./OnboardingBackgroundCheckPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingBackgroundCheck({ searchParams: { pageSize=25, page=1 } }) {
  const client = await clientPromise;
  const db = await client.db();

  const totalRows = await db.collection("employee_profiles").count();

  pageSize = parseInt(pageSize);
  const totalPages = Math.ceil(totalRows / pageSize);
  page = Math.min(totalPages, parseInt(page));

  const employeeProfiles = await db.collection("employee_profiles")
    .find().skip((page - 1) * pageSize).limit(pageSize).toArray();
  for (const employeeProfile of employeeProfiles) {
    employeeProfile._id = employeeProfile._id.toString();
  }
  
  return (
    <OnboardingBackgroundCheckPage employeeProfiles={employeeProfiles} totalRows={totalRows} />
  )
}