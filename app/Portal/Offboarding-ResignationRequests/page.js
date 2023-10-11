import clientPromise from "@/lib/mongodb";
import OffboardingResignationRequestsPage from "./OffboardingResignationRequestPage";

export default async function OffboardingResignationRequests() {
  const client = await clientPromise;
  const db = await client.db();

  const resignationRequests = await db.collection("resignation_requests")
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
    .map(doc => ({ ...doc.profile[0], ...doc }))
    .toArray();
  
  return <OffboardingResignationRequestsPage resignationRequests={resignationRequests} />;
}