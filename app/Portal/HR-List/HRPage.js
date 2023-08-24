"use client";

import styles from "./hr.module.css";
import Table from "../Table";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";

export default function HRListPage({ hrProfiles }) {
  for (const hrProfile of hrProfiles) {
    hrProfile.action = (
      <>
        <button className={styles["edit-button"]}>
        <BiEdit className={styles["icon"]} />
        </button>
        <button className={styles["delete-button"]}>
        <FiTrash className={styles["icon"]} />
        </button>
      </>
    );
  }

  return (
      <div className={styles["container"]}>
      <div className={styles["container-search-button"]}>
      <div className={styles["search-bar"]}>
        <input type="text" placeholder="Filter by Position" />
        <span className={styles["search-icon"]}>&#128269;</span>
      </div>
      <button className={styles["custom-button"]}>
        <Link href="./NewEmployee">
        <span className={styles["plus-icon"]}>&#43;</span>Add New Employee
        </Link>
      </button>
      </div>
      <Table
        columns={[
          {key: "_id", title: "ID"},
          {key: "name", title: "Name"},
          {key: "email", title: "Email"},
          {key: "phone", title: "Phone"},
          {key: "action", title: "Action"}
        ]}
        data={hrProfiles}
        height="400px"
      />
    </div>
  );
}