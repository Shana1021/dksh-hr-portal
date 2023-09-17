"use client";

import styles from "./ofc.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../Table";
import Checklist from "../Checklist";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

export default function ChecklistPage({ offboardingChecklist, todoChecklist, itemChecklist }) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [offboardingChecklist]);

  const checklists = selectedIndex !== null && [
    {
      title: "To Do",
      items: todoChecklist.map(todo => ({
        ...todo,
        checked: !!offboardingChecklist[selectedIndex].todos[todo._id]
      }))
    },
    {
      title: "Items to Return",
      items: itemChecklist.map(item => ({
        ...item,
        checked: !!offboardingChecklist[selectedIndex].items[item._id]
      }))
    }
  ];

  for (const [index, employee] of offboardingChecklist.entries()) {
    employee.checklist = (
      <div className={styles["actions"]}>
        <button className="module-button" onClick={() => setSelectedIndex(index)}>
          Checklist
        </button>
      </div>
    );
  }

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
          { key: "_id", title: "No" },
          { key: "name", title: "Name" },
          { key: "positionID", title: "ID" }, //placeholder
          { key: "lastDate", title: "Last Date" },
          { key: "aor", title: "AOR" },
          { key: "checklist", title: "Action" }
        ]}
        data={offboardingChecklist}
        height="400px"
      />
      {checklists && (
        <Checklist
          checklists={checklists}
          onSave={async (checked, addedItems) => {
            await fetch("/api/checklist/offboarding", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                _id: offboardingChecklist[selectedIndex]._id,
                todos: todoChecklist.map((todo, index) => [todo._id, checked[0][index]])
                  .concat(addedItems[0].map(todo => [todo._id, todo.checked])),
                items: itemChecklist.map((item, index) => [item._id, checked[1][index]])
                  .concat(addedItems[1].map(item => [item._id, item.checked]))
              })
            });

            router.refresh();
          }}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}