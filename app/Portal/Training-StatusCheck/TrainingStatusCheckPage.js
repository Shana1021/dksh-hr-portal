"use client";

import styles from "./training-statuscheck.module.css";
import { useEffect, useState } from "react";
import Table from "../Table";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";
import { FiTrash } from "react-icons/fi";
import ConfirmationDialog from "../ConfirmationDialog";

export default function TrainingStatusCheckPage({ trainings, totalRows }) {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState(null);
  const [filteredTrainings, setFilteredTrainings] = useState(trainings);

  useEffect(() => setFilteredTrainings(trainings), [trainings]);

  const handleSearch = (query) => {
    const filteredData = trainings.filter((training) => {
      return training.title.toLowerCase().includes(query.toLowerCase())
        || training.profile.firstName.toLowerCase().includes(query.toLowerCase())
        || training.profile.lastName.toLowerCase().includes(query.toLowerCase())
        || training._id.toLowerCase().includes(query.toLowerCase())
        || training.vendor._id.toLowerCase().includes(query.toLowerCase())
        || training.vendor.name.toLowerCase().includes(query.toLowerCase())
    });
    setFilteredTrainings(filteredData);
  };

  const [emailStatuses, setEmailStatuses] = useState(
    trainings.map(training => training.status === "Approved" ? "Pending" : "Complete")
  );

  useEffect(() =>
    setEmailStatuses(
      trainings.map(training => training.status === "Approved" ? "Pending" : "Complete")
    ),
    [trainings]
  );

  for (const [index, training] of filteredTrainings.entries()) {
    training.vendorName = training.vendor ? `${training.vendor._id} - ${training.vendor.name}` : "No Vendor";
    training.employeeFirstName = training.profile.firstName;
    training.employeeLastName = training.profile.lastName;

    function handleEmailStatusChange(e) {
      if (training.status === "Approved") {
        setEmailStatuses(emailStatuses.map((emailStatus, i) => i == index ? e.target.value : emailStatus));
      }
    }
    training.emailStatus = (
      <div className={styles["email-status-radios"]}>
        <label>
          <input
            type="radio"
            name={`emailStatus-${training._id}`}
            value="Pending"
            checked={emailStatuses[index] === "Pending"}
            onChange={() => {}}
            onClick={handleEmailStatusChange}
            />{" "}
          Pending
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={`emailStatuses-${training._id}`}
            value="Complete"
            checked={emailStatuses[index] === "Complete"}
            onChange={() => {}}
            onClick={handleEmailStatusChange}
          />{" "}
          Complete
        </label>
      </div>
    );

    if (training.status === "Approved") {
      training.action = (
        <FiTrash
          className="delete-button"
          onClick={() =>
            setConfirmation({
              message: "Are you sure you want to delete this?",
              async onConfirm() {
                const res = await fetch(`/api/training/${encodeURIComponent(training._id)}`, {
                  method: "DELETE"
                });
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
            { key: "title", title: "Course Title" },
            { key: "employeeFirstName", title: "First Name" },
            { key: "employeeLastName", title: "Last Name" },
            { key: "employeeId", title: "Employee ID" },
            { key: "vendorName", title: "Training Vendor" },
            { key: "emailStatus", title: "Email Status" },
            { key: "action", title: "Action" }
          ]}
          data={filteredTrainings}
          height="400px"
          totalRows={totalRows}
        />
        <div className={styles["actions"]}>
          <button
            className="module-button"
            onClick={() =>
              setConfirmation({
                message: "Are you sure you want to send all emails for this page?",
                async onConfirm() {
                  const res = await fetch("/api/training", {
                    method: "PUT",
                    body: JSON.stringify(
                      emailStatuses
                        .map((emailStatus, i) => ({
                          _id: trainings[i]._id,
                          emailStatus
                        }))
                        .filter((update, i) =>
                          trainings[i].status === "Approved" && update.emailStatus === "Complete"
                        )
                        .map(update => update._id)
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
          >Send Email</button>
          <button className="module-button" onClick={() => router.refresh()}>Refresh</button>
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
