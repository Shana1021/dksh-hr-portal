import OnboardingChecklistPage from "./OnboardingChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingChecklist({
  searchParams: { pageSize = 25, page = 1 },
}) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const [onboardingChecklists, totalRows] = await Promise.all([
    db
      .collection("onboarding_checklists")
      .aggregate([
        {
          $lookup: {
            from: "employee_profiles",
            localField: "_id",
            foreignField: "_id",
            as: "profile",
          },
        },
      ])
      .sort({ createdAt: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize)
      .map((doc) => ({ ...doc, profile: doc.profile[0] }))
      .toArray(),
    db.collection("onboarding_checklists").countDocuments(),
  ]);

  return (
    <OnboardingChecklistPage
      onboardingChecklists={onboardingChecklists}
      totalRows={totalRows}
    />
  );
}
