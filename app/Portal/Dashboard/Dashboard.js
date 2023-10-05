import React from "react";
import styles from "./dashboard.module.css";
import BarChart from "./BarChart";

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
          {/*
        <div className={styles["barChart"]}>
          <div id="barChart">
          </div>
        </div>
  */}
        </div>

        <div className={styles["col3"]}>
          <div className={styles["pieChart"]}></div>
        </div>
      </div>

      {/* Section 3 */}
      <div className={styles["bottomSection"]}>
        <div className={styles["col3"]}>
          <div className={styles["doughnutChart"]}>
            {/* Doughnut Chart Content */}
          </div>
        </div>
        <div className={styles["col2"]}>
          <div className={styles["table"]}>{/* Table Content */}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
