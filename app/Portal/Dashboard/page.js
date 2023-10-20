import Dashboard from "./Dashboard.js";
import clientPromise from "@/lib/mongodb";
export default async function DashboardPage() {
  //Database connection
  const client = await clientPromise;
  const db = await client.db();
  const hr_profiles = await db.collection("hr_profiles").find().toArray();
  const tr_request = await db.collection("trainings").find().toArray();
  const resigned = await db
    .collection("signed_acceptance_of_resignations.chunks")
    .find()
    .toArray();

  //Total Employee filtering
  const Totalemp = await db
    .collection("probationary")
    .aggregate([
      {
        $lookup: {
          from: "offboarding_checklists",
          localField: "_id",
          foreignField: "_id",
          as: "offboardingData",
        },
      },
      {
        $lookup: {
          from: "employee_profiles",
          localField: "_id",
          foreignField: "_id",
          as: "employeeData",
        },
      },
      {
        $match: {
          offboardingData: { $eq: [] },
          "employeeData.gender": { $in: ["Male", "Female"] }, // Filter for Male and Female genders
        },
      },
    ])
    .toArray();
  //Gender Filtering
  const maleProfiles = Totalemp.filter(
    (profile) => profile.employeeData[0].gender === "Male"
  );
  const femaleProfiles = Totalemp.filter(
    (profile) => profile.employeeData[0].gender === "Female"
  );
  //console.log(Totalemp);

  //Total of Employees, HRTeam, TrainingRequest, ResignedEmployees
  const totalEmployees = Totalemp.length;
  const totalHREmployees = hr_profiles.length;
  const totalTrainingRequest = tr_request.length;
  const totalResignedEmployees = resigned.length;

  return (
    <Dashboard
      maleProfiles={maleProfiles}
      femaleProfiles={femaleProfiles}
      totalEmployees={totalEmployees}
      totalHREmployees={totalHREmployees}
      totalTrainingRequest={totalTrainingRequest}
      totalResignedEmployees={totalResignedEmployees}
    />
  );
}
