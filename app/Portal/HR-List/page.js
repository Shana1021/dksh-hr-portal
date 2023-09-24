import HRListPage from "./HRPage";
import clientPromise from "@/lib/mongodb";

export default async function HRPageFetch({
  searchParams: { pageSize = 25, page = 1 },
}) {
  pageSize = parseInt(pageSize);
  page = parseInt(page);

  const client = await clientPromise;
  const db = await client.db();
  const hrProfiles = await db
    .collection("hrstaffs")
    .find()
    .sort({ createdAt: -1 })
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
    .toArray();

  const totalRows = await db.collection("hrstaffs").count();
  for (const hrProfile of hrProfiles) {
    hrProfile._id = hrProfile._id.toString();
  }

  return (
    <>
      <HRListPage hrProfiles={hrProfiles} totalRows={totalRows} />
    </>
  );
}
