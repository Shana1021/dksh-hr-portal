"use client";

import { useState } from "react";
import styles from "./offboarding-resignationrequests.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AcknowledgeResignationPopup({ name, department, reason, onClose, onConfirm }) {
  const [accepted, setAccepted] = useState(true);

  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <form
        className={styles["modal"]}
        onClick={e => e.stopPropagation()}
        onSubmit={e => {
          e.preventDefault();

          onConfirm(new FormData(e.target));
        }}
      >
        <span className={styles["close-button"]} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles["h2"]}>Acknowledge Resignation</h2>

        <div className={styles["scroll-container"]}>
          <div className={styles["modal-content"]}>
            <div><b>Employee Name:</b> {name}</div>
            <div><b>Department:</b> {department}</div>
            <div><b>Reason:</b> {reason}</div>
          </div>
          
          <div className={styles["modal-content"]}>
            <h4 className={styles["h4"]}>Response</h4>
            <div className={styles["radio-button-group"]}>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="accept"
                  checked={accepted}
                  onChange={() => setAccepted(true)}
                />
                Yes, accepted Letter of Resignation
              </label>

              <label>
                <input
                  type="radio"
                  name="status"
                  value="reject"
                  checked={!accepted}
                  onChange={() => setAccepted(false)}
                />
                No, rejected Letter of Resignation
              </label>
            </div>
          </div>

          <div className={styles["modal-content"]}>
            <h4 className={styles["h4"]}>Annual Leave Balance</h4>
            <input
              className={styles["input-field"]}
              type="number"
              name="annualLeaveBalance"
              placeholder="e.g. 5"
              min="0"
              required={accepted}
            /> days
          </div>

          <div className={styles["modal-content"]}>
            <h4 className={styles["h4"]}>Manager Email</h4>
            <input
              className={styles["input-field"]}
              type="email"
              name="managerEmail"
              placeholder="manager@dksh.com"
              required={accepted}
            />
          </div>

          <div className={styles["modal-content"]}>
            <h4 className={styles["h4"]}>Upload Acceptance Letter</h4>
            <input
              type="file"
              name="acceptanceLetter"
              required={accepted}
            />
          </div>
        </div>

        <button className={`module-button ${styles["confirm-btn"]}`} type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default function OffboardingResignationRequestsPage({ resignationRequests }) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <div className={styles["container"]}>
        {resignationRequests.map((resignationRequest, index) => (
          <div key={resignationRequest._id} className={styles["card"]} onClick={() => setSelectedIndex(index)}>
            <div className={styles["card-img"]}>
              <Image
                src={`/api/onboarding/${encodeURIComponent(resignationRequest._id)}/profileImage`}
                alt="Profile Image"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles["card-body"]}>
              <h4>{resignationRequest.profile.firstName} {resignationRequest.profile.lastName}</h4>
              <p className={styles["department"]}>{resignationRequest.profile.department}</p> 
            </div>
          </div>
        ))}
      </div>
      {selectedIndex !== null && (
        <AcknowledgeResignationPopup
          name={`${resignationRequests[selectedIndex].profile.firstName} ${resignationRequests[selectedIndex].profile.lastName}`}
          department={resignationRequests[selectedIndex].profile.department}
          reason={resignationRequests[selectedIndex].reason}
          onClose={() => setSelectedIndex(null)}
          onConfirm={async formData => {
            const res = await fetch(`/api/offboarding/${encodeURIComponent(resignationRequests[selectedIndex]._id)}`, {
              method: "POST",
              body: formData
            });
            if (!res.ok) {
              alert(res.statusText);
              return;
            }

            setSelectedIndex(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
