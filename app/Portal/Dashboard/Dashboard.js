import React from "react";
import styles from "./dashboard.module.css";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import EmployeeStatusTable from "./EmployeeStatusTable";

const Dashboard = ({
  femaleProfiles,
  maleProfiles,
  totalEmployees,
  totalHREmployees,
  totalTrainingRequest,
  totalResignedEmployees,
  Depdata,
  Deplabels,
  Statedata,
  Statelabels,
}) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["topSection"]}>
        {/* Section 1 */}
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total Employees</h4>
            <p className={styles["value"]}>{totalEmployees}</p>
            <p className={styles["subtitle"]}>Employees</p>
          </div>
        </div>
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total HR Employees</h4>
            <p className={styles["value"]}>{totalHREmployees}</p>
            <p className={styles["subtitle"]}>Employees</p>
          </div>
        </div>
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total Training Request</h4>
            <p className={styles["value"]}>{totalTrainingRequest}</p>
            <p className={styles["subtitle"]}>Applicants</p>
          </div>
        </div>
        <div className={styles["col1"]}>
          <div className={styles["card"]}>
            <h4 className={styles["title"]}>Total Resigned Employees</h4>
            <p className={styles["value"]}>{totalResignedEmployees}</p>
            <p className={styles["subtitle"]}>Employees</p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles["midSection"]}>
        {/*<div className={styles["col"]}>
          <div className={styles["barChart"]}>
            <h3 className={styles["title-chart"]}>Hires Chart</h3>
            <BarChart />
          </div>
        </div>

        <div className={styles["col"]}>
          <div className={styles["doughnutChart"]}>
            <div className={styles["row"]}>
              <h3 className={styles["title-chart"]}>Employee Composition</h3>
              <DoughnutChart
                maleProfiles={maleProfiles}
                femaleProfiles={femaleProfiles}
              />
            </div>
          </div>
        </div>*/}
        <div className={styles["barChart"]}>
          <h3 className={styles["title-chart"]}>Hires Chart</h3>
          <BarChart Statedata={Statedata} Statelabels={Statelabels} />
        </div>
        <div className={styles["doughnutChart"]}>
          <h3 className={styles["title-chart"]}>Employee Composition</h3>
          <DoughnutChart
            maleProfiles={maleProfiles}
            femaleProfiles={femaleProfiles}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className={styles["bottomSection"]}>
        {/*<div className={styles["col"]}>
          <div className={styles["pieChart"]}>
            <div className={styles["row"]}>
              <h3 className={styles["title-chart"]}>Department Composition</h3>
              <PieChart labels={labels} data={data} />
            </div>
          </div>
        </div>

        <div className={styles["col"]}>
          <div className={styles["table-form"]}>
            <h3 className={styles["title-chart"]}>Employee Status</h3>
            <EmployeeStatusTable />
          </div>
        </div>*/}
        <div className={styles["pieChart"]}>
          <h3 className={styles["title-chart"]}>Department Composition</h3>
          <PieChart Deplabels={Deplabels} Depdata={Depdata} />
        </div>
        <div className={styles["table-form"]}>
          <h3 className={styles["title-chart"]}>Employee Status</h3>
          <EmployeeStatusTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
