"use client";
import React, { useState } from "react";
import Popup from "./popup";
import styles from "./res.module.css";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles["container"]}>
      <div className={styles["card"]} onClick={openPopup}> {/* Add onClick to the card */}
      <img className={styles["card-img"]}
          src="../test.png"
          alt="Card-img-cap"
        />
        <div className={styles["card-body"]}>
          <h4 className={styles["name"]}>Rasul</h4>
          <p className={styles["position"]}>Lead Programmer</p> 
        </div>
      </div>

      <div className={styles["card"]}>
        <img className={styles["card-img"]}
          src="../test.png"
          alt="Card-img-cap"
        />
        <div className={styles["card-body"]}>
          <h4 className={styles["name"]}>Rasul</h4>
          <p className={styles["position"]}>Lead Programmer</p>
          {/*<button className={`module-button ${styles["button"]}`} onClick={openPopup}>Click me</button>*/}
        </div>
      </div>
      
      <div className={styles["card"]}>
      <img className={styles["card-img"]}
          src="../test.png"
          alt="Card-img-cap"
        />
        <div className={styles["card-body"]}>
          <h4 className={styles["name"]}>Rasul</h4>
          <p className={styles["position"]}>Lead Programmer</p>
        </div>
      </div>
      
      <Popup onClose={closePopup} isOpen={isOpen} />
    </div>
  );
}
