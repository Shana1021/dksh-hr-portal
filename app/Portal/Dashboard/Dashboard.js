import React from "react";
import styles from "./dashboard.module.css";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import EmployeeStatusTable from "./EmployeeStatusTable";

const Dashboard = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["topSection"]}>
        {/* Section 1 */}
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total Employees</h4>
            <p className={styles["value"]}>4800</p>
            <p className={styles["subtitle"]}>Employees</p>
          </div>
        </div>
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total Employees</h4>
            <p className={styles["value"]}>4800</p>
            <p className={styles["subtitle"]}>Employees</p>
          </div>
        </div>
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total Employees</h4>
            <p className={styles["value"]}>4800</p>
            <p className={styles["subtitle"]}>Employees</p>
          </div>
        </div>
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total Employees</h4>
            <p className={styles["value"]}>4800</p>
            <p className={styles["subtitle"]}>Employees</p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles["midSection"]}>
        <div className={styles["col"]}>
          <div className={styles["barChart"]}>
            <h3 className={styles["title-chart"]}>Hires Chart</h3>
            <BarChart />
          </div>
        </div>

        <div className={styles["col"]}>
          <div className={styles["doughnutChart"]}>
          <div className={styles["row"]}>
            <h3 className={styles["title-chart"]}>Employee Composition</h3>
            <DoughnutChart />
          </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className={styles["bottomSection"]}>
        <div className={styles["col"]}>
          <div className={styles["pieChart"]}>
            <div className={styles["row"]}>
            <h3 className={styles["title-chart"]}>Department Composition</h3>
            <PieChart />
            </div>
          </div>
        </div>

        <div className={styles["col"]}>
          <div className={styles["table-form"]}>
            <h3 className={styles["title-chart"]}>Employee Status</h3>
            <EmployeeStatusTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
