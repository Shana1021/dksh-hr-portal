"use client";

import styles from "./onboarding-bc.module.css";
import Table from "../Table";
import Link from "next/link";

export default function OnboardingBackgroundCheckPage({ employeeProfiles }) {
  for (const employeeProfile of employeeProfiles) {
    
  }

  return (
    <div className={styles["container"]}>
      <Table
        data={employeeProfiles}
        columns={[
          {key: "_id", title: "ID"},
          {key: "firstName", title: "First Name"},
          {key: "middleName", title: "Middle Name"},
          {key: "lastName", title: "Last Name"},
          {key: "employeeId", title: "Employee ID"},
          {key: "gender", title: "Gender"},
          {key: "dob", title: "D.O.B"},
          {key: "email", title: "Email"},
          {key: "position", title: "Position"},
          {key: "department", title: "Department"},
          {key: "addressLine1", title: "Address Line 1"},
          {key: "addressLine2", title: "Address Line 2"},
          {key: "city", title: "City"},
          {key: "state", title: "State"},
          {key: "postalCode", title: "Postal Code"},
          {key: "phone", title: "Phone Number"},
          {key: "bcStatus", title: "BC Status"},
          {key: "emailStatus", title: "Email Status"}
        ]}
        height="400px"
      />
      <div className={styles["actions"]}>
        <Link className="module-button" href="/Portal/Onboarding-BackgroundCheck/Employee/Add">Add Employee</Link>
        <button className="module-button">Send Email</button>
      </div>
    </div>
  );
}
