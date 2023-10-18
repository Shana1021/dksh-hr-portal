import clientPromise from "@/lib/mongodb";
import TrainingVendorListPage from "./TrainingVendorListPage";

export default async function TrainingVendorList({ searchParams: { pageSize=25, page=1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const [vendors, totalRows] = await Promise.all([
    db.collection("vendors")
      .aggregate([
        {
          $lookup: {
            from: "training",
            localField: "_id",
            foreignField: "vendor",
            as: "training"
          }
        },
        {
          $project: {
            name: true,
            email: true,
            phone: true,
            references: { $size: "$training" }
          }
        }
      ])
      .sort({ createdAt: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize)
      .toArray(),
    db.collection("vendors").countDocuments()
  ]);

  return <TrainingVendorListPage vendors={vendors} totalRows={totalRows} />;
}