"use client";

import styles from "./offboarding-checklist.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../Table";
import Checklist from "../Checklist";
import SearchBar from "../SearchBar";

export default function OffboardingChecklistPage({ offboardingChecklists }) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => setSelectedIndex(null), [offboardingChecklists]);

  const checklists = selectedIndex !== null && [
    {
      title: "To Do",
      items: [],
    },
    {
      title: "Items to Return",
      items: [],
    },
  ];

  for (const [index, employee] of offboardingChecklists.entries()) {
    employee.action = (
      <button className="module-button" onClick={() => setSelectedIndex(index)}>
        Checklist
      </button>
    );
  }

  return (
    <>
      <div className={styles["container"]}>
        <SearchBar />
        <Table
          columns={[
            { key: "_id", title: "No" },
            { key: "name", title: "Name" },
            { key: "positionID", title: "ID" }, //placeholder
            { key: "lastDate", title: "Last Date" },
            { key: "aor", title: "AOR" },
            { key: "action", title: "Action" },
          ]}
          data={offboardingChecklists}
          height="400px"
        />
      </div>
      {checklists && (
        <Checklist
          checklists={checklists}
          onSave={async (updatedChecklist) => {
            const res = await fetch("/api/offboarding-checklist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                _id: offboardingChecklists[selectedIndex]._id,
                todos: updatedChecklist[0].items,
                items: updatedChecklist[1].items,
              }),
            });
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
