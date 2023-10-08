"use client";

import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import styles from "./ack.module.css";
import Calendar from "react-calendar";

export default function AcknowledgedEmployees() {
  const [date, setDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(0);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handleDownloadClick = () => {
    // Just testing purpose only
    const fileUrl = "https://example.com/path/to/your/file.pdf";
    // Just testing purpose only
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "filename.pdf";
    link.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleNumberOfDaysChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue)) {
      setNumberOfDays(parsedValue);
    }
  };

  return (
    <div className={styles["background-image"]} style={{ backgroundImage: "url('/img/business.jpg')" }}>
      <div>
        <img src="img/dksh.png" alt="DKSH" />
      </div>
      <div className={styles["page"]}>
        <div className={styles["acknowledged"]}>
          <h1>Employee Acknowledgment</h1>
          <p>Hi,</p>
          <p>
            After careful consideration, we have officially accepted your resignation and issued the
            Acceptance of Resignation Letter (AOR). Do take note of the Annual Leave Balance,
            <input type="text" onChange={handleNumberOfDaysChange} className={styles["input-field"]} />{" "}
            {numberOfDays === 1 ? "day" : "days"}
          </p>
          <p>Please state your last day of work and upload back the signed AOR for our reference, Thank you.</p>
        </div>

        <div className={styles["row"]}>
          <div className={styles["calendar"]}>
            <h1>End Date</h1>
            <div className={styles["react-calendar-medium"]}>
              <Calendar value={date} onChange={onChange} />
              <p>Current selected date is: <b>{date.toDateString()}</b></p>
            </div>
          </div>

          <div className={styles["column"]}>
            <div className={styles["resignation-letter"]}>
              <h1>Acceptance of Resignation Letter</h1>
              <h2>Download the AOR file here</h2>
              <a href="#" onClick={handleDownloadClick} className={styles["download-link"]}>
                <button>Download AOR <FaDownload /></button>
              </a>
            </div>
            <div className={styles["aor-letter"]}>
              <h1>Return of AOR</h1>
              <h2>Upload your signed file here</h2>
              <input type="file" onChange={handleFileChange} className={styles["upload"]} />
            </div>

            <div className={styles["button-container"]}>
          <button> SAVE & SUBMIT</button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
