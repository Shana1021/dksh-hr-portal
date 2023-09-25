import { ObjectId } from "mongodb";
import EmployeeProfileForm from "./EmployeeProfileForm";
import clientPromise from "@/lib/mongodb";

export default async function Employee({ params }) {
  if (params.id === "New") {
    return <EmployeeProfileForm />;
  }

  const client = await clientPromise;
  const db = await client.db();
  const employeeProfile = await db
    .collection("employee_profiles")
    .findOne({ _id: params.id });

  return <EmployeeProfileForm employeeProfile={employeeProfile} />;
}
