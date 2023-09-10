/* checklist*/
"use client";

import styles from "./onc.module.css";
import Table from "../Table";
import Link from "next/link";

export default function ChecklistPage({ checklistItems }) {
  for (const item of checklistItems) {
    item.checklist = (
      <>
        <div className={styles["actions"]}>
        <Link className="module-button" href="#">Checklist</Link>
      </div>
      </>
    );
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["container-search-button"]}>
        <div className={styles["search-bar"]}>
          <input type="text" placeholder="Filter by Status" />
          <span className={styles["search-icon"]}>&#128269;</span>
        </div>
      </div>
      <Table
        columns={[
          { key: "_id", title: "No" },
          { key: "name", title: "Name" },
          { key: "positionID", title: "ID" }, 
          { key: "department", title: "Department" },
          { key: "action", title: "Action" }
        ]}
        data={checklistItems}
        height="400px"
      />
    </div>
  );
}