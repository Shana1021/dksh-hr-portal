import OffboardingChecklistPage from "./OffboardingChecklistPage";
import clientPromise from "@/lib/mongodb";

export default async function OffboardingChecklist({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);
  
  const client = await clientPromise;
  const db = await client.db();
  
  const [offboardingChecklists, totalRows] = await Promise.all([
    db.collection("offboarding_checklists")
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
      .map(doc => ({ ...doc, profile: doc.profile[0] }))
      .toArray(),
    db.collection("offboarding_checklists").countDocuments()
  ]);
  
  return <OffboardingChecklistPage offboardingChecklists={offboardingChecklists} totalRows={totalRows} />
}