import HRListPage from "./HRListPage";
import clientPromise from "@/lib/mongodb";

export default async function HRList({ searchParams: { pageSize = 25, page = 1 } }) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();

  const [hrProfiles, totalRows] = await Promise.all([
    db.collection("hr_profiles")
      .find()
      .sort({ createdAt: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize)
      .toArray(),
    db.collection("hr_profiles").countDocuments()
  ]);
  
  return <HRListPage hrProfiles={hrProfiles} totalRows={totalRows} />;
}
