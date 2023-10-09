// Tabs.js
import React, { useState } from "react";
import styles from "./settings.module.css";

const Tabs = ({ activeTab, onChangeTab }) => {
  return (
    <div className={styles.tabs}>
      <div
        className={`${styles.tab} ${activeTab === "Profile" && styles.active}`}
        onClick={() => onChangeTab("Profile")}
      >
        Profile
      </div>
      <div
        className={`${styles.tab} ${activeTab === "Email" && styles.active}`}
        onClick={() => onChangeTab("Email")}
      >
        Email
      </div>
      <div
        className={`${styles.tab} ${activeTab === "Account" && styles.active}`}
        onClick={() => onChangeTab("Account")}
      >
        Account
      </div>
    </div>
  );
};

export default Tabs;