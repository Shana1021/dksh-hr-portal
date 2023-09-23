"use client";

import styles from "./confirmation-dialog.module.css";

export default function ConfirmationDialog({ children, onClose, onConfirm }) {
  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-content"]}>
          <span className={styles["close-button"]} onClick={onClose}>
            &times;
          </span>
          <div className={styles["alert-msg1"]}>{children}</div>
          <div className={styles["alert-msg2"]}><b>Note: This action cannot be undone!</b></div>
        </div>
        <button className={`module-button ${styles["confirm-btn"]}`} onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}
