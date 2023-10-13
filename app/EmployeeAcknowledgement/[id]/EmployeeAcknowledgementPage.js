"use client";

import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import styles from "./employee-acknowledgement.module.css";
import Calendar from "react-calendar";
import Image from "next/image";

export default function EmployeeAcknowledgementPage({ acceptedResignation }) {
  const [endDate, setEndDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/acknowledge-resignation/${encodeURIComponent(acceptedResignation._id)}`, {
      method: "POST",
      body: new FormData(e.target)
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles["page"]}>
        <div className={styles["thank-you"]}>
          <BsFillCheckCircleFill size="70" color="green" />
          <h1>Thank You</h1>
          <p>Your response has been recorded.</p>
          
          <div className={styles["button-container"]} style={{ marginTop: 20 }}>
            <button onClick={() => setSubmitted(false)}>Back to Form?</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className={styles["page"]} onSubmit={handleSubmit}>
      <div className={styles["acknowledged"]}>
        <div className={styles["logo"]}>
          <Image
            src="/dksh_logo.png"
            alt="DKSH Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <h1>Employee Acknowledgment</h1>
        <p>Hi <b>{acceptedResignation.profile.firstName} {acceptedResignation.profile.lastName}</b></p>
        <p>
          After careful consideration, we have officially accepted your resignation and issued the
          Acceptance of Resignation Letter (AOR).
          Do take note of the Annual Leave Balance: <b>{acceptedResignation.annualLeaveBalance} day(s)</b>.
        </p>
        <p>Please state your last day of work and re-upload the signed AOR for our reference, Thank you.</p>
      </div>

      <div className={styles["row"]}>
        <div className={styles["calendar"]}>
          <h1>End Date</h1>
          <div className={styles["react-calendar-medium"]}>
            <input type="hidden" name="endDate" value={endDate.toISOString()} />
            <Calendar value={endDate} onChange={date => setEndDate(date)} />
            <p>Selected date is: <b>{endDate.toDateString()}</b></p>
          </div>
        </div>

        <div className={styles["column"]}>
          <div className={styles["resignation-letter"]}>
            <h1>Acceptance of Resignation Letter</h1>
            <h2>Download the AOR file here</h2>
            <a href={`/api/offboarding/${encodeURIComponent(acceptedResignation._id)}/aor`} download>
              <button type="button">Download AOR <FaDownload /></button>
            </a>
          </div>
          <div className={styles["aor-letter"]}>
            <h1>Return of AOR</h1>
            <h2>Upload your signed file here</h2>
            <input className={styles["upload"]} name="aor" type="file" required />
          </div>

          <div className={styles["button-container"]}>
            <button type="submit">SUBMIT</button>
          </div>
        </div>
      </div>
    </form>
  );
}
