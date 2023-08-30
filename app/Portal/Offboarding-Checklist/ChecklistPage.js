"use client";
import { useState } from "react"; // Import useState
import styles from "./ofc.module.css";
import Table from "../Table";
import Link from "next/link";

export default function ChecklistPage({ checklistItems }) {
  const [showModal, setShowModal] = useState(false);
  const [activeList, setActiveList] = useState(1); // Track the active list (1 or 2)

  const lists = [
    [
      "Task 1",
      "Task 2",
      // Add more tasks as needed for List 1
    ],
    [
      "Task A",
      "Task B",
      // Add more tasks as needed for List 2
    ],
  ];

  const modalContent = (
    <div className={styles["modal-overlay"]}>
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <h2>Checklist</h2>
        {/* Tabs for switching between lists */}
        <div className={styles["tabs"]}>
            <div
              className={`${styles["tab"]} ${
                activeList === 1 ? styles["active-tab"] : ""
              }`}
              onClick={() => setActiveList(1)}
            >
              List 1
            </div>
            <div
              className={`${styles["tab"]} ${
                activeList === 2 ? styles["active-tab"] : ""
              }`}
              onClick={() => setActiveList(2)}
            >
              List 2
            </div>
          </div>
          {/* Display the active list */}
          <ul className={styles["checklist"]}>
            {lists[activeList - 1].map((task, index) => (
              <li key={index}>
                <label>
                  <input type="checkbox" /> {task}
                </label>
              </li>
            ))}
          </ul>
          <div className={styles["button-container"]}>
            <button className={styles["popup-button"]} onClick={() => setShowModal(false)} >Save</button>
            <button className={styles["popup-button"]} onClick={() => setShowModal(false)} >Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  for (const item of checklistItems) {
    item.checklist = (
      <>
        <div className={styles["actions"]}>
          <button className="module-button" onClick={() => setShowModal(true)}>
            Checklist
          </button>
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
          { key: "positionID", title: "ID" }, //placeholder
          { key: "lastDate", title: "Last Date" },
          { key: "aor", title: "AOR" },
          { key: "checklist", title: "Action" }
        ]}
        data={checklistItems}
        height="400px"
      />

       {/*Conditionally render the modal */}
       {showModal && modalContent}
    </div>
  );
}