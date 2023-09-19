"use client";

import styles from "./onc.module.css";
import Table from "../Table";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function OnboardingChecklistPage({ onboardingChecklist, totalRows }) {
  return (
    <div className={styles["container"]}>
      <div className={styles["container-search-button"]}>
        <div className={styles["search-bar"]}>
          <input type="text" placeholder="Filter by Status" />
          <span className={styles["search-icon"]}><FaSearch/></span>
        </div>
      </div>
      <Table
        columns={[
          { key: "_id", title: "Employee ID" },
          { key: "firstName", title: "First Name" },
          { key: "lastName", title: "Last Name" }
        ]}
        data={onboardingChecklist}
        height="400px"
        totalRows={totalRows}
      />
    </div>
  );
}