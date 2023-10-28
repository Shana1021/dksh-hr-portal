"use client";

import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import styles from "./employee-acknowledgement.module.css";
import Calendar from "react-calendar";
import Image from "next/image";

export default function EmployeeAcknowledgementPage({ acceptedResignation }) {
  const [endDate, setEndDate] = useState(new Date());
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitted) {
      return;
    }
    setSubmitted(true);

    const res = await fetch(
      `/api/acknowledge-resignation/${encodeURIComponent(
        acceptedResignation.employeeId
      )}`,
      {
        method: "POST",
        body: new FormData(e.target),
      }
    );
    if (!res.ok) {
      setSubmitted(false);
      alert(res.statusText);
      return;
    }

    setAcknowledged(true);
  }

  if (acknowledged) {
    return (
      <div className={styles["page"]}>
        <div className={styles["thank-you"]}>
          <FiCheckCircle size="120" color="forestgreen" />
          <h1>Thank You</h1>
          <p>Your response has been recorded.</p>

          <div
            className={styles["button-container"]}
            style={{ marginTop: 20, marginRight: 35 }}
          >
            <button onClick={() => setSubmitted(false)}>Back to Form?</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={styles["page"]} onSubmit={handleSubmit}>
      <div className={styles["logo"]}>
        <Image
          src="/dksh_logo.png"
          alt="DKSH Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={styles["acknowledged"]}>
        <h1>
          <span>Employee Acknowledgement</span>
        </h1>
        <p>
          Hi{" "}
          <b>
            <u>
              {acceptedResignation.profile.firstName}{" "}
              {acceptedResignation.profile.lastName}
            </u>
          </b>
        </p>
        <p>
          After careful consideration, we have officially accepted your
          resignation and issued the Acceptance of Resignation Letter (AOR). Do
          take note of the Annual Leave Balance:{" "}
          <b>
            <u>{acceptedResignation.annualLeaveBalance} day(s)</u>
          </b>
          .
        </p>
        <p>
          Please state your last day of work and re-upload the signed AOR for
          our reference, Thank you.
        </p>
      </div>

      <div className={styles["row"]}>
        <div className={styles["calendar"]}>
          <h1>
            <span>End Date</span>
          </h1>
          <div className={styles["react-calendar-medium"]}>
            <input type="hidden" name="endDate" value={endDate.toISOString()} />
            <Calendar value={endDate} onChange={(date) => setEndDate(date)} />
            <p>
              Selected date is:{" "}
              <b>
                <u>{endDate.toDateString()}</u>
              </b>
            </p>
          </div>
        </div>

        <div className={styles["column"]}>
          <div className={styles["resignation-letter"]}>
            <h1>
              <span>Acceptance of Resignation Letter</span>
            </h1>
            <h2>Download the AOR file here</h2>
            <a
              href={`/api/offboarding/${encodeURIComponent(
                acceptedResignation.employeeId
              )}/aor`}
              download
            >
              <button type="button">
                Download AOR <FaDownload />
              </button>
            </a>
          </div>
          <div className={styles["aor-letter"]}>
            <h1>
              <span>Return of AOR</span>
            </h1>
            <h2>Upload your signed file here</h2>
            <button type="button">
              <input
                className={styles["upload"]}
                name="aor"
                type="file"
                required
              />
            </button>
          </div>

          <div className={styles["button-container"]}>
            <button type="submit">SUBMIT</button>
          </div>
        </div>
      </div>
    </form>
  );
}
