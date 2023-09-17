"use client";
import React, { useState } from "react";
import styles from "./res.module.css";
import { useRouter } from "next/navigation";

//icons
import { BiCalendar } from "react-icons/bi"; //Calendar
import { HiOutlineIdentification } from "react-icons/hi2"; //ID
import { CiMoneyCheck1} from "react-icons/ci"; //Title

export default function Home() {
  const [textareaValue, setTextareaValue] = useState("");
  const maxCharacters = 250; // Maximum allowed characters

  // Function to update the textarea height as the user types
  const handleTextareaChange = (event) => {
    const element = event.target;
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
    const inputValue = event.target.value;
    
    // Limit the input to maxCharacters
    if (inputValue.length <= maxCharacters) {
      setTextareaValue(inputValue);
    }

    // Reset the height when the input is empty
    if (inputValue === "") {
        element.style.height = "3.5em"; // Adjust to the initial height
      }
    };

  return (
    <>
    <div className={styles.formBody}>
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <div className={styles.row}>
            {/*Request for Resignation*/}
            <h4 className={styles.h4}>Request for Resignation</h4>
            <h5 className={styles.h5}>Fill the below form....</h5>
            <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
              <input
                type="date"
                placeholder="Date"
                className={styles.input}
              />
              <div className={styles.inputIcon}>
                <BiCalendar />
              </div>
            </div>
            <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
              <input
                type="text"
                placeholder="Employee ID"
                className={styles.input}
              />
              <div className={styles.inputIcon}>
                <HiOutlineIdentification />
              </div>
            </div>
            <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
              <textarea
                    placeholder="Reason"
                    className={`${styles.input} ${styles.textarea}`}
                    onChange={handleTextareaChange} // Add onChange event handler
                    value={textareaValue} // Bind the value to the state
                  />
              <div className={styles.inputIcon}>
                <CiMoneyCheck1/>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <button className={styles.button}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  </>
  )
}
