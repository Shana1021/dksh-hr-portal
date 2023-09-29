"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker"; 
import { FaDownload, FaUpload } from "react-icons/fa";
import styles from "./ack.module.css";
import "react-datepicker/dist/react-datepicker.css"; 

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

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleNumberOfDaysChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue)) {
      setNumberOfDays(parsedValue);
    }
  };
  

  return (
    <div className={styles["page"]}>
      <div className={styles["acknowledged"]}>
        <h1>Employee Acknowledgment</h1>
        <p>Hi, </p>
        <p>
          After careful consideration, we have officially accepted your resignation and issued the
          Acceptance of Resignation Letter (AOR). Do take note of the Annual Leave Balance,
          <input
            type="text"
            onChange={handleNumberOfDaysChange}
            className={styles["input-field"]}
          />
          {numberOfDays == 1 ? "day" : "days"}
          <br />
          <p>
            {" "}
            Please state your last day of work and upload back the signed AOR for our reference,
            Thank you.{" "}
          </p>
        </p>
      </div>

      <div className={styles["center-container"]}>
        <div className={styles["calendar-container"]}>
          <h2>End Date</h2>
          <DatePicker
            selected={date}
            onChange={onChange}
            className={styles["calendar"]} // You can apply your CSS styles here
          />
        </div>

        <div className={styles["resignation-letter"]}>
          <h2>Acceptance of Resignation Letter</h2>
          <h3>Download the AOR file here</h3>
          <div>
            <button onClick={handleDownloadClick}>
              Download File <FaDownload />
            </button>
          </div>
        </div>

        <div className={styles["aor-letter"]}>
          <h2>Return of AOR</h2>
          <h3>Upload your signed file here</h3>
          <div>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>
              Upload <FaUpload />
            </button>
          </div>
        </div>
      </div>
      <div className={styles["button-container"]}>
        <button className="module-button">SAVE & SUBMIT</button>
      </div>
    </div>
  );
}
