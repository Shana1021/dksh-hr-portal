"use client";

import styles from "./onboarding-checklist.module.css";
import Table from "../Table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checklist from "../Checklist";
import SearchBar from "../SearchBar";
export default function OnboardingChecklistPage({
  onboardingChecklists,
  totalRows,
}) {
  const [filteredProfiles, setFilteredProfiles] =
    useState(onboardingChecklists);
  const handleSearch = (query) => {
    const filteredData = onboardingChecklists.filter((profile) => {
      const searchFields = ["firstName", "lastName", "email", "department"];
      return searchFields.some((field) =>
        profile && profile[field]
          ? profile[field].toLowerCase().includes(query.toLowerCase())
          : false
      );
    });
    setFilteredProfiles(filteredData);
  };
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  for (const [index, checklist] of onboardingChecklists.entries()) {
    checklist.firstName = checklist.profile.firstName;
    checklist.lastName = checklist.profile.lastName;
    checklist.email = checklist.profile.email;
    checklist.department = checklist.profile.department;

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
      items: onboardingChecklists[selectedIndex].todos,
    },
    {
      title: "Items to Collect",
      items: onboardingChecklists[selectedIndex].items,
    },
  ];

  return (
    <>
      <div className={styles["container"]}>
        <SearchBar onSearch={handleSearch} />
        <Table
          columns={[
            { key: "_id", title: "Employee ID" },
            { key: "firstName", title: "First Name" },
            { key: "lastName", title: "Last Name" },
            { key: "email", title: "Email" },
            { key: "department", title: "Department" },
            { key: "status", title: "Status" },
            { key: "action", title: "Action" },
          ]}
          data={filteredProfiles}
          height="400px"
          totalRows={totalRows}
        />
        <div className={styles["actions"]}>
          <button onClick={() => router.refresh()} className="module-button">Refresh</button>
        </div>
      </div>
      {checklists && (
        <Checklist
          initialChecklists={checklists}
          completed={onboardingChecklists[selectedIndex].completed}
          onSave={async (updatedChecklists) => {
            setSelectedIndex(null);

            const res = await fetch(
              `/api/onboarding-checklist/${encodeURIComponent(
                onboardingChecklists[selectedIndex]._id
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
