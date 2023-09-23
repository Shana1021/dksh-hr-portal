"use client";

import styles from "./onboarding-bc.module.css";
import Table from "../Table";
import Link from "next/link";
import { FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ConfirmationDialog from "../ConfirmationDialog";

export default function OnboardingBackgroundCheckPage({ employeeProfiles, totalRows }) {
  const router = useRouter();
  const [statuses, setStatuses] = useState(employeeProfiles.map(employeeProfile => employeeProfile.status));
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => setStatuses(employeeProfiles.map(employeeProfile => employeeProfile.status)), [employeeProfiles]);

  for (const [index, employeeProfile] of employeeProfiles.entries()) {
    employeeProfile.id = (
      <Link href={`/Portal/Employee/${encodeURIComponent(employeeProfile._id)}`}>
        {employeeProfile._id}
      </Link>
    );

    function handleBCStatusChange(e) {
      if (employeeProfile.status === "Pending") {
        setStatuses(statuses.map((bcStatus, i) => i == index ? e.target.value : bcStatus))
      }
    }
    employeeProfile.bcStatus = (
      <div className={styles["bc-status-radios"]}>
        <label>
          <input
            type="radio"
            name={`bcStatus-${employeeProfile._id}`}
            value="Pending"
            checked={statuses[index] === "Pending"}
            onChange={handleBCStatusChange}
          /> Pending
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={`bcStatus-${employeeProfile._id}`}
            value="Pass"
            checked={statuses[index] === "Pass"}
            onChange={handleBCStatusChange}
          /> Pass
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={`bcStatus-${employeeProfile._id}`}
            value="Fail"
            checked={statuses[index] === "Fail"}
            onChange={handleBCStatusChange}
            /> Fail
        </label>
      </div>
    );

    employeeProfile.emailStatus = (
      <div
        className={
          `${styles["email-status-label"]} 
          ${styles[employeeProfile.status === "Pending" ? "email-status-pending" : "email-status-complete"]}`
        }
      >
        {employeeProfile.status === "Pending" ? "Pending" : "Complete"}
      </div>
    );

    if (employeeProfile.status === "Pending") {
      employeeProfile.action = (
        <>
          <FiTrash
            className="delete-button"
            onClick={() =>
              setConfirmation({
                message: "Are you sure you want to delete this?",
                async onConfirm() {
                  const res = await fetch(`/api/employee/${encodeURIComponent(employeeProfile._id)}`, {
                    method: "DELETE"
                  });
                  if (!res.ok) {
                    alert(res.statusText);
                    return;
                  }

                  router.refresh();
                }
              })
            }
          />
        </>
      );
    }
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
            { key: "id", title: "Employee ID" },
            { key: "firstName", title: "First Name" },
            { key: "lastName", title: "Last Name" },
            { key: "email", title: "Email" },
            { key: "position", title: "Position" },
            { key: "department", title: "Department" },
            { key: "bcStatus", title: "BC Status" },
            { key: "emailStatus", title: "Email Status" },
            { key: "action", title: "Action" }
          ]}
          data={employeeProfiles}
          height="400px"
          totalRows={totalRows}
        />
        <div className={styles["actions"]}>
          <Link className="module-button" href="/Portal/Employee/New">Add Employee</Link>
          <button
            className="module-button"
            onClick={() =>
              setConfirmation({
                message: "Are you sure you want to send all emails for this page?",
                async onConfirm() {
                  const res = await fetch("/api/employee", {
                    method: "PUT",
                    body: JSON.stringify(
                      statuses
                        .map((status, i) => ({
                          _id: employeeProfiles[i]._id,
                          status
                        }))
                        .filter((update, i) => employeeProfiles[i].status === "Pending" && update.status !== "Pending")
                    )
                  });
                  if (!res.ok) {
                    alert(res.statusText);
                    return;
                  }
                  
                  router.refresh();
                }
              })
            }
          >
            Send Email
          </button>
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
