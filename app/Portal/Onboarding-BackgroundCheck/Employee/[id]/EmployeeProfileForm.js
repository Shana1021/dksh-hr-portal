"use client";

import styles from "./employee.module.css";
import { useRouter } from "next/navigation";

export default function EmployeeProfileForm({ employeeProfile }) {
  const router = useRouter();

  let handleSubmit;
  if (employeeProfile) {
    handleSubmit = async function(e) {
      e.preventDefault();
  
      await fetch("/api/employee/" + employeeProfile._id, {
        method: "PUT",
        body: new FormData(e.target)
      });

      router.push("/Portal/Onboarding-BackgroundCheck");
      router.refresh();
    };
  } else {
    handleSubmit = async function(e) {
      e.preventDefault();
  
      await fetch("/api/employee", {
        method: "POST",
        body: new FormData(e.target)
      });

      router.push("/Portal/Onboarding-BackgroundCheck");
      router.refresh();
    };
  }

  const gender = employeeProfile?.gender ?? "Male";

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["employee-profile-form"]}>
        <label className={styles["employee-profile-field"]}>
          Employee First Name
          <input type="text" name="firstName" placeholder="Enter First Name" defaultValue={employeeProfile?.firstName} />
        </label>
        <label className={styles["employee-profile-field"]}>
          Employee Email
          <input type="email" name="email" placeholder="Enter Employee Email" defaultValue={employeeProfile?.email} required />
        </label>
        <label className={styles["employee-profile-field"]}>
          Employee Middle Name
          <input type="text" name="middleName" placeholder="Enter Middle Name" defaultValue={employeeProfile?.middleName} />
        </label>
        <div className={styles["field-group"]}>
          <label className={styles["employee-profile-field"]}>
            Position
            <input type="text" name="position" placeholder="Enter Position" defaultValue={employeeProfile?.position} />
          </label>
          <label className={styles["employee-profile-field"]}>
            Department
            <input type="text" name="department" placeholder="Enter Department" defaultValue={employeeProfile?.department} />
          </label>
        </div>
        <label className={styles["employee-profile-field"]}>
          Employee Last Name
          <input type="text" name="lastName" placeholder="Enter Last Name" defaultValue={employeeProfile?.lastName} />
        </label>
        <label className={styles["employee-profile-field"]}>
          Address Line 1
          <input type="text" name="addressLine1" placeholder="Enter Address Line 1" defaultValue={employeeProfile?.addressLine1} />
        </label>
        <label className={styles["employee-profile-field"]}>
          Employee ID
          <input type="text" name="employeeId" placeholder="Enter Employee ID" defaultValue={employeeProfile?.employeeId} required />
        </label>
        <label className={styles["employee-profile-field"]}>
          Address Line 2
          <input type="text" name="addressLine2" placeholder="Enter Address Line 2" defaultValue={employeeProfile?.addressLine2} />
        </label>
        <div className={styles["employee-profile-field"]}>
          Gender
          <div className={styles["gender"]}>
            <label>
              <input type="radio" name="gender" value="Male" defaultChecked={gender === "Male"} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" defaultChecked={gender === "Female"} />
              Female
            </label>
          </div>
        </div>
        <div className={styles["field-group"]}>
          <label className={styles["employee-profile-field"]}>
            City
            <input type="text" name="city" placeholder="Enter City" defaultValue={employeeProfile?.city} />
          </label>
          <label className={styles["employee-profile-field"]}>
            State
            <input type="text" name="state" placeholder="Enter State" defaultValue={employeeProfile?.state} />
          </label>
        </div>
        <label className={styles["employee-profile-field"]}>
          D.O.B
          <input type="date" name="dob" defaultValue={employeeProfile?.dob} />
        </label>
        <div className={styles["field-group"]}>
          <label className={styles["employee-profile-field"]}>
            Postal Code
            <input type="text" name="postalCode" placeholder="Enter Postal Code" defaultValue={employeeProfile?.postalCode} />
          </label>
          <label className={styles["employee-profile-field"]}>
            Phone Number
            <input type="tel" name="phone" placeholder="Enter Phone Number" defaultValue={employeeProfile?.phone} />
          </label>
        </div>
      </div>
      <input type="hidden" name="bcStatus" value={employeeProfile?.bcStatus ?? "Pending"} />
      <input type="hidden" name="emailStatus" value={employeeProfile?.emailStatus ?? "Pending"} />
      <button type="submit" className={`module-button ${styles["submit"]}`}>Submit</button>
    </form>
  );
}