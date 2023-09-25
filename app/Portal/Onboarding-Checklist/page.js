import OnboardingChecklistPage from "./OnboardingChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingChecklist({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const onboardingChecklists = await db.collection("onboarding_checklists")
    .aggregate([
      {
        $lookup: {
          from: "employee_profiles",
          localField: "_id",
          foreignField: "_id",
          as: "profile"
        }
      }
    ])
    .sort({ createdAt: -1 })
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
    .map(doc => ({ ...doc, ...doc.profile[0] }))
    .toArray();

  const totalRows = await db.collection("onboarding_checklists").count();
  
  return <OnboardingChecklistPage onboardingChecklists={onboardingChecklists} totalRows={totalRows} />;
}