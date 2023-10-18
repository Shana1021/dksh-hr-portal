import styles from "./dashboard.module.css";
import Image from "next/image";
export default function EmployeeStatusTable() {
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
            <tr>
              <td>
                <span className={styles["image-container"]}>
                  <Image
                    src="/dksh_logo.png"
                    alt="DKSH Logo"
                    width={50}
                    height={25}
                  />
                </span>
                Rasul
              </td>
              <td>Marketing</td>
              <td>30</td>
              <td>TR</td>
              <td>Pending</td>
            </tr>

            <tr>
              <td>
                <span className={styles["image-container"]}>
                  <Image
                    src="/dksh_logo.png"
                    alt="DKSH Logo"
                    width={50}
                    height={25}
                  />
                </span>
                Naksha
              </td>
              <td>Finance</td>
              <td>20</td>
              <td>AOR</td>
              <td>Incomplete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
