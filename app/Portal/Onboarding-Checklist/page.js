import OnboardingChecklistPage from "./OnboardingChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function ChecklistPageFetch({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const onboardingChecklist = await db.collection("onboarding_checklist")
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
    .map(doc => ({
      ...doc,
      ...doc.profile[0]
    }))
    .toArray();

  const totalRows = await db.collection("onboarding_checklist").count();
  
  return <OnboardingChecklistPage onboardingChecklist={onboardingChecklist} totalRows={totalRows} />;
}