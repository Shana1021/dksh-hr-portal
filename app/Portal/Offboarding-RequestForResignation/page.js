"use client";

import styles from "./offboarding-requestforresignation.module.css";
import { HiOutlineIdentification } from "react-icons/hi2"; //ID
import { CiMoneyCheck1 } from "react-icons/ci"; //Title
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const employeeIdRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/offboarding", {
      method: "POST",
      body: new FormData(e.target),
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }

    const data = await res.json();

    if (data.status === "idDoesNotExist") {
      employeeIdRef.current.setCustomValidity("This employee does not exist.");
      employeeIdRef.current.reportValidity();
      return;
    }

    if (data.status === "requestExists") {
      employeeIdRef.current.setCustomValidity(
        "This employee has an existing resignation request."
      );
      employeeIdRef.current.reportValidity();
      return;
    }

    if (data.status === "alreadyResigned") {
      employeeIdRef.current.setCustomValidity(
        "This employee has already resigned."
      );
      employeeIdRef.current.reportValidity();
      return;
    }

    router.push("/Portal/Offboarding-ResignationRequests");
    router.refresh();
  }

  return (
    <div className={styles.formBody}>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              {/*Request for Resignation*/}
              <h4 className={styles.h4}>Request for Resignation</h4>
              <h5 className={styles.h5}>Fill the below form....</h5>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  ref={employeeIdRef}
                  type="text"
                  placeholder="Employee ID"
                  className={styles.input}
                  name="_id"
                  required
                  onChange={(e) => {
                    e.target.setCustomValidity("");
                    e.target.reportValidity();
                  }}
                />
                <div className={styles.inputIcon}>
                  <HiOutlineIdentification />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <textarea
                  placeholder="Reason"
                  className={`${styles.input} ${styles.textarea}`}
                  rows="1"
                  onChange={(e) => {
                    e.target.style.height = "inherit";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  name="reason"
                  required
                />
                <div className={styles.inputIcon}>
                  <CiMoneyCheck1 />
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <button className={styles.button} type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
