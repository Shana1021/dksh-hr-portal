"use client";

import styles from "./onboarding-backgroundcheck.module.css";
import Table from "../Table";
import Link from "next/link";
import { FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import SearchBar from "../SearchBar";

export default function OnboardingBackgroundCheckPage({
  employeeProfiles,
  totalRows,
}) {
  const [filteredProfiles, setFilteredProfiles] = useState(employeeProfiles);

  useEffect(() => setFilteredProfiles(employeeProfiles), [employeeProfiles]);

  const handleSearch = (query) => {
    const filteredData = employeeProfiles.filter((profile) => {
      const searchFields = ["firstName", "lastName", "email", "department"];
      return searchFields.some((field) =>
        profile[field].toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredProfiles(filteredData);
  };

  const router = useRouter();
  const [bcStatuses, setBCStatuses] = useState(filteredProfiles.map(employeeProfile => employeeProfile.bcStatus));
  const [confirmation, setConfirmation] = useState(null);
  
  useEffect(
    () =>
      setBCStatuses(
        filteredProfiles.map(employeeProfile => employeeProfile.bcStatus)
      ),
    [filteredProfiles]
  );
  
  for (const [index, employeeProfile] of filteredProfiles.entries()) {
    employeeProfile.id = (
      <Link
        href={`/Portal/Employee/${encodeURIComponent(employeeProfile._id)}`}
      >
        {employeeProfile._id}
      </Link>
    );

    function handleBCStatusChange(e) {
      if (employeeProfile.bcStatus === "Pending") {
        setBCStatuses(
          bcStatuses.map((bcStatus, i) =>
            i == index ? e.target.value : bcStatus
          )
        );
      }
    }
    employeeProfile.bcStatusRadios = (
      <div className={styles["bc-status-radios"]}>
        <label>
          <input
            type="radio"
            name={`bcStatus-${employeeProfile._id}`}
            value="Pending"
            checked={bcStatuses[index] === "Pending"}
            onChange={() => {}}
            onClick={handleBCStatusChange}
          />{" "}
          Pending
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={`bcStatus-${employeeProfile._id}`}
            value="Pass"
            checked={bcStatuses[index] === "Pass"}
            onChange={() => {}}
            onClick={handleBCStatusChange}
          />{" "}
          Pass
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={`bcStatus-${employeeProfile._id}`}
            value="Fail"
            checked={bcStatuses[index] === "Fail"}
            onChange={() => {}}
            onClick={handleBCStatusChange}
          />{" "}
          Fail
        </label>
      </div>
    );

    employeeProfile.emailStatus = (
      <div
        className={`${styles["email-status-label"]} 
          ${
            styles[
              employeeProfile.bcStatus === "Pending"
                ? "email-status-pending"
                : "email-status-complete"
            ]
          }`}
      >
        {employeeProfile.bcStatus === "Pending" ? "Pending" : "Complete"}
      </div>
    );

    if (employeeProfile.bcStatus === "Pending") {
      employeeProfile.action = (
        <FiTrash
          className="delete-button"
          onClick={() =>
            setConfirmation({
              message: "Are you sure you want to delete this?",
              async onConfirm() {
                const res = await fetch(
                  `/api/onboarding/${encodeURIComponent(
                    employeeProfile._id
                  )}`,
                  {
                    method: "DELETE",
                  }
                );
                if (!res.ok) {
                  alert(res.statusText);
                  return;
                }

                router.refresh();
              },
            })
          }
        />
      );
    }
  }

  return (
    <>
      <div className={styles["container"]}>
        <SearchBar onSearch={handleSearch} />
        <Table
          columns={[
            { key: "id", title: "Employee ID" },
            { key: "firstName", title: "First Name" },
            { key: "lastName", title: "Last Name" },
            { key: "email", title: "Email" },
            { key: "position", title: "Position" },
            { key: "department", title: "Department" },
            { key: "bcStatusRadios", title: "BC Status" },
            { key: "emailStatus", title: "Email Status" },
            { key: "action", title: "Action" },
          ]}
          data={filteredProfiles}
          height="400px"
          totalRows={totalRows}
        />
        <div className={styles["actions"]}>
          <Link className="module-button" href="/Portal/Employee">
            Add Employee
          </Link>
          <button
            className="module-button"
            onClick={() =>
              setConfirmation({
                message:
                  "Are you sure you want to send all emails for this page?",
                async onConfirm() {
                  const res = await fetch("/api/onboarding", {
                    method: "PUT",
                    body: JSON.stringify(
                      bcStatuses
                        .map((bcStatus, i) => ({
                          _id: filteredProfiles[i]._id,
                          bcStatus,
                        }))
                        .filter((update, i) =>
                          filteredProfiles[i].bcStatus === "Pending" && update.bcStatus !== "Pending"
                        )
                    ),
                  });
                  if (!res.ok) {
                    alert(res.statusText);
                    return;
                  }

                  router.refresh();
                },
              })
            }
          >
            Send Email
          </button>
          <button onClick={() => router.refresh()} className="module-button">Refresh</button>
        </div>
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
  );
}
