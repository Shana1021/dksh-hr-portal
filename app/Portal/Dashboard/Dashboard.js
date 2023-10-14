import React from "react";
import styles from "./dashboard.module.css";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import Table from "../Table";

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
        <div className={styles["col2"]}>
          <div className={styles["barChart"]}>
            <h3 className={styles["title"]}>Hires Chart</h3>
            <BarChart />
          </div>
        </div>

        <div className={styles["col3"]}>
          <div className={styles["doughnutChart"]}>
            <h3 className={styles["title"]}>Employee Composition</h3>
            <DoughnutChart />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className={styles["bottomSection"]}>
        <div className={styles["col4"]}>
          <div className={styles["pieChart"]}>
            <h3 className={styles["title"]}>Department Composition</h3>
            <PieChart />
          </div>
        </div>
        <div className={styles["col5"]}>
          <div className={styles["table"]}>
            <h3 className={styles["title"]}>Employee Status</h3>
            {/* <Table /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
