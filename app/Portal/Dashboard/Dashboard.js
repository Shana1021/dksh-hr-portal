"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import EmployeeStatusTable from "./EmployeeStatusTable";
import LineChart from "./LineChart";

export const dynamic = "force-dynamic";

const Dashboard = ({
  femaleProfiles,
  maleProfiles,
  totalEmployees,
  totalHREmployees,
  totalTrainingRequest,
  totalResignedEmployees,
  employeeStatuses,
  GroupByMonth,
  GroupByDepartment,
  GroupByState,
}) => {
  const tableCardRef = useRef(null);
  const tableCardTitleRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(
    () =>
      setTableHeight(
        tableCardRef.current.clientHeight -
          tableCardTitleRef.current.clientHeight
      ),
    []
  );

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
        <div className={styles["doughnutChart"]}>
          <h3 className={styles["title-chart"]}>Employee Composition</h3>
          <DoughnutChart
            maleProfiles={maleProfiles}
            femaleProfiles={femaleProfiles}
          />
        </div>
        <div className={styles["lineChart"]}>
          <h3 className={styles["title-chart"]}>Hires Chart</h3>
          <LineChart
            probationary={GroupByMonth.map((item) => item.probationary)}
            month={GroupByMonth.map((item) => item.monthName)}
          />
        </div>

        <div className={styles["pieChart"]}>
          <h3 className={styles["title-chart"]}>Department Composition</h3>
          <PieChart
            Deplabels={GroupByDepartment.map((item) => item.label)}
            Depdata={GroupByDepartment.map((item) => item.data)}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className={styles["bottomSection"]}>
        <div className={styles["barChart"]}>
          <h3 className={styles["title-chart"]}>Employees by State</h3>
          <BarChart
            Statedata={GroupByState.map((item) => item.data)}
            Statelabels={GroupByState.map((item) => item.label)}
          />
        </div>
        <div ref={tableCardRef} className={styles["table-form"]}>
          <h3 ref={tableCardTitleRef} className={styles["title-chart"]}>
            Employee Status
          </h3>
          <EmployeeStatusTable
            employeeStatuses={employeeStatuses}
            height={tableHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
