"use client";

import { useState } from "react";
import styles from "./offboarding-resignationrequests.module.css";
import Image from "next/image";

function AcknowledgeResignationPopup({ onClose, onConfirm }) {
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
          style={{ width: 200 }}
        />
      </div>

      <div className={styles["modal-content"]}>
        <input
          type="file"
          name="acceptanceLetter"
        />
      </div>
      <button className={`module-button ${styles["confirm-btn"]}`} onClick={onConfirm}>
        Confirm
      </button>
      </div>
    </div>
  );
}

export default function OffboardingResignationRequestsPage({ resignationRequests }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className={styles["container"]}>
        {resignationRequests.map(resignationRequest => (
          <div key={resignationRequest._id} className={styles["card"]} onClick={() => setShowPopup(true)}>
            <div className={styles["card-img"]}>
              <Image
                src={`/api/onboarding/${encodeURIComponent(resignationRequest._id)}/profileImage`}
                alt="Profile Image"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles["card-body"]}>
              <h4>{resignationRequest.firstName} {resignationRequest.lastName}</h4>
              <p className={styles["department"]}>{resignationRequest.department}</p> 
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <AcknowledgeResignationPopup onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
