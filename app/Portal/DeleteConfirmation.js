"use client";

import React from "react";
import styles from "./popup.module.css";

export default function DeleteConfirmation({ onClose, onConfirm }) {
  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-content"]}>
          <span className={styles["close-button"]} onClick={onClose}>
            &times;
          </span>
          <div className={styles["alert-msg1"]}>Are you sure you want to delete this?</div>
          <div className={styles["alert-msg2"]}><b>Note: This action cannot be undone after proceeding</b></div>
          </div>
          <button className={`module-button ${styles["confirm-btn"]}`} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
  );
}
