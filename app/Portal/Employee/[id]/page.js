import EmployeeProfileForm from "./EmployeeProfileForm";
import clientPromise from "@/lib/mongodb";

export default async function Employee({ params: { id } }) {
  if (id === "New") {
    return <EmployeeProfileForm />;
  }

  const client = await clientPromise;
  const db = await client.db();
  const employeeProfile = await db.collection("employee_profiles").findOne({ _id: id });

  return <EmployeeProfileForm employeeProfile={employeeProfile} />;
}
