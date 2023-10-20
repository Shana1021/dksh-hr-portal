import clientPromise from "@/lib/mongodb";
import EmployeeAcknowledgementPage from "./EmployeeAcknowledgementPage";
import { ObjectId } from "mongodb";

export default async function EmployeeAcknowledgement({ params: { id } }) {
  const client = await clientPromise;
  const db = await client.db();

  const acceptedResignation = await db.collection("accepted_resignations")
    .aggregate([
      {
        $match: { _id: new ObjectId(id) }
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
    .map(doc => ({ ...doc, profile: doc.profile[0], _id: doc._id.toString() }))
    .next();

  return <EmployeeAcknowledgementPage acceptedResignation={acceptedResignation} />;
}