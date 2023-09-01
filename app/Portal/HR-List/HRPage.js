"use client";

import styles from "./hr.module.css";
import Table from "../Table";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
export default function HRListPage({ hrProfiles, id }) {
  const router = useRouter();
  const removeData = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/HRStaff?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };

  for (const hrProfile of hrProfiles) {
    hrProfile.action = (
      <>
        <button id={id} className={styles["edit-button"]}>
          <BiEdit className={styles["icon"]} />
        </button>
        <button className={styles["delete-button"]} onClick={removeData}>
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
          { key: "_id", title: "ID" },
          { key: "fname", title: "Name" },
          { key: "email", title: "Email" },
          { key: "number", title: "Phone" },
          { key: "action", title: "Action" },
        ]}
        data={hrProfiles}
        height="400px"
      />
    </div>
  );
}
