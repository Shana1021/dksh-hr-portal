"use client";

import { useState } from "react";
import Popup from "./popup";
import styles from "./res.module.css";
import Image from "next/image";

export default function OffboardingResignationRequestsPage({ resignationRequests }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["card"]} onClick={() => setShowPopup(true)}>
          <div className={styles["card-img"]}>
            <Image
              src="/test.png"
              alt="Card-img-cap"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles["card-body"]}>
            <h4 className={styles["name"]}>Rasul</h4>
            <p className={styles["position"]}>Lead Programmer</p> 
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
