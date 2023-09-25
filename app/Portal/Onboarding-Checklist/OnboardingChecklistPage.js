"use client";

import styles from "./onboarding-checklist.module.css";
import Table from "../Table";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Checklist from "../Checklist";

export default function OnboardingChecklistPage({ onboardingChecklists, totalRows }) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => setSelectedIndex(null), [onboardingChecklists]);

  for (const [index, checklist] of onboardingChecklists.entries()) {
    checklist.action = (
      <button className="module-button" onClick={() => setSelectedIndex(index)}>
        Checklist
      </button>
    )
  }

  const checklists = selectedIndex !== null && [
    {
      title: "To Do",
      items: onboardingChecklists[selectedIndex].todos
    },
    {
      title: "Items to Collect",
      items: onboardingChecklists[selectedIndex].items
    }
  ];

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
            { key: "action", title: "Action" }
          ]}
          data={onboardingChecklists}
          height="400px"
          totalRows={totalRows}
        />
      </div>
      {checklists && (
        <Checklist
          initialChecklists={checklists}
          onSave={async updatedChecklists => {
            const res = await fetch("/api/onboarding-checklist", {
              method: "PUT",
              body: JSON.stringify({
                _id: onboardingChecklists[selectedIndex]._id,
                todos: updatedChecklists[0].items,
                items: updatedChecklists[1].items
              })
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