"use client";

import React, { useState } from "react";
import Calendar from 'react-calendar'; 
import { FaDownload, FaUpload} from 'react-icons/fa'; 
import styles from './ack.module.css';

export default function AcknowledgedEmployees() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  }
  
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDownloadClick = () => {
    const fileUrl = 'https://example.com/path/to/your/file.pdf';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'filename.pdf'; 
    link.click();
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
     
      const formData = new FormData();
      formData.append('file', selectedFile);
    } else {
    
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className={styles['page']}>
      <div className={styles['acknowledged']}>
        <h1>Employee Acknowledgment</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type words here..."
        />
        <p> Message: {inputValue}</p>
      </div>

      <div className={styles['center-container']}>
        <div className={styles['calendar-container']}>
          <h2>End Date</h2>
          <Calendar
            onChange={onChange}
            value={date}
            className={styles['calendar']}
          />
        </div>

        <div className={styles['resignation-letter']}>
          <h2>Acceptance of Resignation Letter</h2>
          <h3>Download the AOR file here</h3>
          <div>
            <button onClick={handleDownloadClick}>
              Download File <FaDownload />
            </button>
          </div>
        </div>

        <div className={styles['aor-letter']}>
          <h2>Return of AOR</h2>
          <h3>Upload your signed file here</h3>
          <div>
            <input 
              type="file"
              accept=".pdf" 
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>
              Upload <FaUpload/>
            </button>
          </div>
        </div>
      </div>
      <div className={styles["button"]}>
        <button className="module-button">SAVE & SUBMIT</button>
      </div>
    </div>
  );
}