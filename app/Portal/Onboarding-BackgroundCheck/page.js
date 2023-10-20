import OnboardingBackgroundCheckPage from "./OnboardingBackgroundCheckPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingBackgroundCheck({ searchParams: { pageSize=25, page=1, search="" } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const [employeeProfiles, totalRows] = await Promise.all([
    db.collection("employee_profiles")
      .find()
      .sort({ createdAt: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize)
      .toArray(),
    db.collection("employee_profiles").countDocuments()
  ]);
  
  return <OnboardingBackgroundCheckPage employeeProfiles={employeeProfiles} totalRows={totalRows} />;
}