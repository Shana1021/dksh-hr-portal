"use client";

import styles from "./offboarding-checklist.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Table from "../Table";
import Checklist from "../Checklist";
import SearchBar from "../SearchBar";
import { FaDownload } from "react-icons/fa";

export default function OffboardingChecklistPage({ offboardingChecklists, totalRows }) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  for (const [index, checklist] of offboardingChecklists.entries()) {
    checklist.firstName = checklist.profile.firstName;
    checklist.lastName = checklist.profile.lastName;
    checklist.email = checklist.profile.email;
    checklist.department = checklist.profile.department;

    checklist.lastDate = checklist.endDate.toDateString();

    checklist.aor = (
      <a href={`/api/acknowledge-resignation/${encodeURIComponent(checklist._id)}/signed-aor`} download>
        <button className={styles["download"]}>
          Download <FaDownload />
        </button>
      </a>
    );

    checklist.status = (
      <div
        className={`${styles["status-label"]} ${
          styles[
            checklist.completed
              ? "status-label-complete"
              : "status-label-incomplete"
          ]
        }`}
      >
        {checklist.completed ? "Complete" : "Incomplete"}
      </div>
    );

    checklist.action = (
      <button className="module-button" onClick={() => setSelectedIndex(index)}>
        Checklist
      </button>
    );
  }

  const checklists = selectedIndex !== null && [
    {
      title: "To Do",
      items: offboardingChecklists[selectedIndex].todos,
    },
    {
      title: "Items to Return",
      items: offboardingChecklists[selectedIndex].items,
    },
  ];

  return (
    <>
      <div className={styles["container"]}>
        <SearchBar />
        <Table
          columns={[
            { key: "_id", title: "Employee ID" },
            { key: "firstName", title: "First Name" },
            { key: "lastName", title: "Last Name" },
            { key: "department", title: "Department" },
            { key: "lastDate", title: "Last Date" },
            { key: "aor", title: "AOR" },
            { key: "status", title: "Status" },
            { key: "action", title: "Action" }
          ]}
          data={offboardingChecklists}
          height="400px"
          totalRows={totalRows}
        />
      </div>
      {checklists && (
        <Checklist
          initialChecklists={checklists}
          checkOnly
          completed={offboardingChecklists[selectedIndex].completed}
          onSave={async updatedChecklists => {
            setSelectedIndex(null);

            const res = await fetch(
              `/api/offboarding-checklist/${encodeURIComponent(
                offboardingChecklists[selectedIndex]._id
              )}`,
              {
                method: "PUT",
                body: JSON.stringify({
                  todos: updatedChecklists[0].items,
                  items: updatedChecklists[1].items,
                }),
              }
            );
            if (!res.ok) {
              alert(res.statusText);
              return;
            }

            router.refresh();
          }}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
