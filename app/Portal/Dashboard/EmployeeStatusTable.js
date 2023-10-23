import styles from "./dashboard.module.css";
import Image from "next/image";

export default function EmployeeStatusTable({ employeeStatuses }) {
  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-scroll-container"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employeeStatuses.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <div className={styles["profile-image"]}>
                    <Image
                      src={`/api/onboarding/${encodeURIComponent(
                        employee._id
                      )}/profileImage?${new Date().getTime()}`}
                      alt="Profile Image"
                      fill
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      unoptimized
                    />
                  </div>
                  {employee.name}
                </td>
                <td>{employee.department}</td>
                <td>{employee.age}</td>
                <td>{employee.task}</td>
                <td>{employee.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
