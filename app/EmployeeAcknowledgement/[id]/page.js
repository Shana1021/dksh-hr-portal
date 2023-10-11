import clientPromise from "@/lib/mongodb";
import EmployeeAcknowledgementPage from "./EmployeeAcknowledgementPage";

export default async function EmployeeAcknowledgement({ params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  const acceptedResignation = await db.collection("accepted_resignations")
    .aggregate([
      {
        $match: { _id: id }
      },
      {
        $lookup: {
          from: "employee_profiles",
          localField: "_id",
          foreignField: "_id",
          as: "profile"
        }
      }
    ])
    .map(doc => ({ ...doc.profile[0], ...doc }))
    .next();

  return <EmployeeAcknowledgementPage acceptedResignation={acceptedResignation} />;
}