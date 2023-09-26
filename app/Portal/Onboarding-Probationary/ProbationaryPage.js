'use client';

import styles from './onboarding-probationary.module.css';
import Table from "../Table";
import { FaSearch } from "react-icons/fa";
import { BsClipboard2Check } from "react-icons/bs";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";

export default function ProbationaryPage({ probationaries, totalRows }) {
  const [confirmation, setConfirmation] = useState(null);

  for (const probationary of probationaries) {
    const startDate = probationary.createdAt;
    probationary.startDate = startDate.toLocaleDateString();

    const endDate = new Date(probationary.createdAt.valueOf());
    endDate.setDate(endDate.getDate() + 90); // 90 days of probation
    probationary.endDate = endDate.toLocaleDateString();

    const differenceMillis = Math.max(0, endDate - new Date());
    probationary.daysLeft = Math.ceil(differenceMillis / 1000 / 60 / 60 / 24);

    probationary.status = (
      <div
        className={`${styles["status-label"]} ${styles[probationary.completed ? "status-label-complete" : "status-label-incomplete"]}`}
      >
        {probationary.completed ? "Complete" : "Incomplete"}
      </div>
    );

    probationary.action = (
      <BsClipboard2Check
        className={styles["mark-completed"]}
        onClick={() =>
          setConfirmation({
            message: "Are you sure you want to mark as complete?",
            async onConfirm() {
              // TODO
            }
          })
        }
      />
    );
  }

  return (
    <>
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
            { key: "lastName", title: "Last Name" },
            { key: "email", title: "Email" },
            { key: "startDate", title: "Start Date" },
            { key: "endDate", title: "End Date" },
            { key: "daysLeft", title: "Days Left" },
            { key: "status", title: "Status" },
            { key: "action", title: "Action" }
          ]}
          data={probationaries}
          height="400px"
          totalRows={totalRows}
        />
      </div>
      {confirmation && (
        <ConfirmationDialog
          onConfirm={() => {
            setConfirmation(null);
            confirmation.onConfirm();
          }}
          onClose={() => setConfirmation(null)}
        >
          {confirmation.message}
        </ConfirmationDialog>
      )}
    </>
  )
}