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
  //Filter by Department
  const GroupByDepartment = await db
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
        },
      },
      {
        $group: {
          _id: "$employeeData.department", // Group by department
          count: { $sum: 1 }, // Count employees in each department
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the output
          label: "$_id",
          data: "$count",
        },
      },
    ])
    .toArray();

  // Filter by State
  const GroupByState = await db
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
        },
      },
      {
        $group: {
          _id: "$employeeData.state", // Group by department
          count: { $sum: 1 }, // Count employees in each department
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the output
          label: "$_id",
          data: "$count",
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

  //Filter Total of Employees, HRTeam, TrainingRequest, ResignedEmployees
  const totalEmployees = Totalemp.length;
  const totalHREmployees = hr_profiles.length;
  const totalTrainingRequest = tr_request.length;
  const totalResignedEmployees = resigned.length;

  const employeeStatuses = await db.collection("employee_profiles")
    .aggregate([
      {
        $project: {
          name: { $concat: ["$firstName", " ", "$lastName"] },
          department: true,
          age: { $ifNull: [{ $dateDiff: { startDate: "$dob", endDate: new Date(), unit: "year" } }, "-"] },
          task: "BC",
          status: "$bcStatus",
          createdAt: true
        }
      },
      {
        $unionWith: {
          coll: "trainings",
          pipeline: [
            {
              $lookup: {
                from: "employee_profiles",
                localField: "employeeId",
                foreignField: "_id",
                as: "profile"
              }
            },
            {
              $project: {
                _id: "$employeeId",
                name: { $concat: [{ $first: "$profile.firstName" }, " ", { $first: "$profile.lastName" }] },
                department: { $first: "$profile.department" },
                age: {
                  $ifNull: [{ $dateDiff: { startDate: { $first: "$profile.dob" }, endDate: new Date(), unit: "year" } }, "-"]
                },
                task: "TR",
                status: true,
                createdAt: true
              }
            }
          ]
        }
      },
      {
        $unionWith: {
          coll: "accepted_resignations",
          pipeline: [
            {
              $lookup: {
                from: "employee_profiles",
                localField: "_id",
                foreignField: "_id",
                as: "profile"
              }
            },
            {
              $lookup: {
                from: "offboarding_checklists",
                localField: "_id",
                foreignField: "_id",
                as: "acknowledgement"
              }
            },
            {
              $project: {
                name: { $concat: [{ $first: "$profile.firstName" }, " ", { $first: "$profile.lastName" }] },
                department: { $first: "$profile.department" },
                age: {
                  $ifNull: [{ $dateDiff: { startDate: { $first: "$profile.dob" }, endDate: new Date(), unit: "year" } }, "-"]
                },
                task: "AOR",
                status: {
                  $cond: {
                    if: { $gt: [{ $size: "$acknowledgement" }, 0] },
                    then: "Complete",
                    else: "Pending"
                  }
                },
                createdAt: true
              }
            }
          ]
        }
      }
    ])
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  return (
    <Dashboard
      maleProfiles={maleProfiles}
      femaleProfiles={femaleProfiles}
      totalEmployees={totalEmployees}
      totalHREmployees={totalHREmployees}
      totalTrainingRequest={totalTrainingRequest}
      totalResignedEmployees={totalResignedEmployees}
      Deplabels={GroupByDepartment.map((item) => item.label)}
      Depdata={GroupByDepartment.map((item) => item.data)}
      Statelabels={GroupByState.map((item) => item.label)}
      Statedata={GroupByState.map((item) => item.data)}
      employeeStatuses={employeeStatuses}
    />
  );
}
