import OnboardingBackgroundCheckPage from "./OnboardingBackgroundCheckPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingBackgroundCheck({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();
  const employeeProfiles = await db.collection("employee_profiles")
    .find()
    .sort({ createdAt: -1 })
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
    .toArray();

  const totalRows = await db.collection("employee_profiles").count();
  
  return (
    <OnboardingBackgroundCheckPage employeeProfiles={employeeProfiles} totalRows={totalRows} />
  )
}