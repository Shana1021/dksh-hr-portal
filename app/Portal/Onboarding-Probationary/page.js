import ProbationaryPage from "./ProbationaryPage";
import clientPromise from "@/lib/mongodb";

export default async function OnboardingProbationary({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const probationaries = await db.collection("probationary")
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

  const totalRows = await db.collection("probationary").count();
  
  return <ProbationaryPage probationaries={probationaries} totalRows={totalRows} />;
}