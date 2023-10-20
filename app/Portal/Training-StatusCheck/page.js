import clientPromise from "@/lib/mongodb";
import TrainingStatusCheckPage from "./TrainingStatusCheckPage";

export default async function TrainingStatusCheck({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const [trainings, totalRows] = await Promise.all([
    db.collection("trainings")
      .aggregate([
        {
          $match: { $or: [{ status: "Approved" }, { status: "Complete" }] }
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendor",
            foreignField: "_id",
            as: "vendor"
          }
        },
        {
          $lookup: {
            from: "employee_profiles",
            localField: "employeeId",
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
        vendor: doc.vendor[0],
        profile: doc.profile[0],
        _id: doc._id.toString()
      }))
      .toArray(),
    db.collection("trainings").countDocuments()
  ]);
  
  return <TrainingStatusCheckPage trainings={trainings} totalRows={totalRows} />;
}