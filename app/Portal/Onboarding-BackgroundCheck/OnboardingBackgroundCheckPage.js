"use client";

import styles from "./onboarding-bc.module.css";
import Table from "../Table";
import Link from "next/link";

export default function OnboardingBackgroundCheckPage({ employeeProfiles, totalRows }) {
  for (const employeeProfile of employeeProfiles) {
    // TODO
  }

  return (
    <div className={styles["container"]}>
      <Table
        columns={[
          {key: "employeeId", title: "Employee ID"},
          {key: "firstName", title: "First Name"},
          {key: "middleName", title: "Middle Name"},
          {key: "lastName", title: "Last Name"},
          {key: "gender", title: "Gender"},
          {key: "email", title: "Email"},
          {key: "position", title: "Position"},
          {key: "department", title: "Department"},
          {key: "phone", title: "Phone Number"},
          {key: "bcStatus", title: "BC Status"},
          {key: "emailStatus", title: "Email Status"}
        ]}
        data={employeeProfiles}
        height="400px"
        totalRows={totalRows}
      />
      <div className={styles["actions"]}>
        <Link className="module-button" href="/Portal/Onboarding-BackgroundCheck/Employee/Add">Add Employee</Link>
        <button className="module-button">Send Email</button>
      </div>
    </div>
  );
}
