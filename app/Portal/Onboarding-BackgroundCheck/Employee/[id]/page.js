"use client";

import styles from "./employee.module.css";
import { useRouter } from "next/navigation";

export default function EmployeeProfile({ params }) {
  const router = useRouter();

  let handleSubmit;
  if (params.id === "Add") {
    handleSubmit = async e => {
      e.preventDefault();
  
      await fetch("/api/employee", {
        method: "POST",
        body: new FormData(e.target)
      });

      router.push("/Portal/Onboarding-BackgroundCheck");
      router.refresh();
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["employee-profile-form"]}>
        <label className={styles["employee-profile-field"]}>
          Employee First Name
          <input type="text" name="firstName" placeholder="Enter First Name" />
        </label>
        <label className={styles["employee-profile-field"]}>
          Employee Email
          <input type="email" name="email" placeholder="Enter Employee Email" required />
        </label>
        <label className={styles["employee-profile-field"]}>
          Employee Middle Name
          <input type="text" name="middleName" placeholder="Enter Middle Name" />
        </label>
        <div className={styles["field-group"]}>
          <label className={styles["employee-profile-field"]}>
            Position
            <input type="text" name="position" placeholder="Enter Position" required />
          </label>
          <label className={styles["employee-profile-field"]}>
            Department
            <input type="text" name="department" placeholder="Enter Department" required />
          </label>
        </div>
        <label className={styles["employee-profile-field"]}>
          Employee Last Name
          <input type="text" name="lastName" placeholder="Enter Last Name" />
        </label>
        <label className={styles["employee-profile-field"]}>
          Address Line 1
          <input type="text" name="addressLine1" placeholder="Enter Address Line 1" />
        </label>
        <label className={styles["employee-profile-field"]}>
          Employee ID
          <input type="text" name="employeeId" placeholder="Enter Employee ID" required />
        </label>
        <label className={styles["employee-profile-field"]}>
          Address Line 2
          <input type="text" name="addressLine2" placeholder="Enter Address Line 2" />
        </label>
        <div className={styles["employee-profile-field"]}>
          Gender
          <div className={styles["gender"]}>
            <label>
              <input type="radio" name="gender" value="Male" defaultChecked />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" />
              Female
            </label>
          </div>
        </div>
        <div className={styles["field-group"]}>
          <label className={styles["employee-profile-field"]}>
            City
            <input type="text" name="city" placeholder="Enter City" />
          </label>
          <label className={styles["employee-profile-field"]}>
            State
            <input type="text" name="state" placeholder="Enter State" />
          </label>
        </div>
        <label className={styles["employee-profile-field"]}>
          D.O.B
          <input type="date" name="dob" />
        </label>
        <div className={styles["field-group"]}>
          <label className={styles["employee-profile-field"]}>
            Postal Code
            <input type="text" name="postalCode" placeholder="Enter Postal Code" />
          </label>
          <label className={styles["employee-profile-field"]}>
            Phone Number
            <input type="tel" name="phone" placeholder="Enter Phone Number" />
          </label>
        </div>
      </div>
      <input type="hidden" name="bcStatus" value="Pending" />
      <input type="hidden" name="emailStatus" value="Pending" />
      <button type="submit" className={`module-button ${styles["submit"]}`}>Submit</button>
    </form>
  );
}