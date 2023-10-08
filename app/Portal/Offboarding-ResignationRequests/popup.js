
import React from "react";
import styles from "./res.module.css";

export default function Popup({ onClose }) {
  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <span className={styles["close-button"]} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles["h2"]}>Acknowledge Resignation</h2>
        <div className={styles["modal-content"]}>
          <h4 className={styles["h4"]}>Response</h4>
          <div className={styles["radio-button-group"]}>
          <label>
            <input
              type="radio"
              name="status"
            />
            Yes, accepted Letter of Resignation
          </label>

          <label>
            <input
              type="radio"
              name="status"
            />
            No, rejected Letter of Resignation
          </label>
        </div>
      </div>

      <div className={styles["modal-content"]}>
        <input
          type="number"
          name="annualLeaveBalance"
          placeholder="Annual Leave Balance (days)"
        />
      </div>

      <div className={styles["modal-content"]}>
        <input
          type="file"
          name="acceptanceLetter"
        />
      </div>
      <button className={`module-button ${styles["confirm-btn"]}`} >
        Confirm
      </button>
      </div>
    </div>
  );
}