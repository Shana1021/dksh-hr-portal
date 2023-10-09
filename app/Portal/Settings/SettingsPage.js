"use client";

import React, { useState } from "react";
import styles from "./settings.module.css";
//import { useRouter } from "next/router";
import Tabs from "./Tabs"; // Import the Tabs component
import Profile from "./Profile";

export default function SettingsPage({
  initialITTeamEmailAddress,
  initialAdminTeamEmailAddress,
  initialHRTeamEmailAddress,
}) {
 // const router = useRouter();
  const [activeTab, setActiveTab] = useState("Profile"); // State to manage the active tab


  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/settings", {
      method: "PUT",
      body: new FormData(e.target),
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    
    router.refresh();
  }

  return (
    <>
      {/* Render the Tabs component */}
      <Tabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Content for each tab */}
      {activeTab === "Profile" && (
         <div className={styles.tabContent}>
          <div className={styles.tabContentBox}>
          {/*Profile*/}
          <Profile />
         </div>
         </div>
    
      )}

      {/* Email tab */}
      {activeTab === "Email" && (
        <div className={styles.tabContent}>
           <div className={styles.tabContentBox}>
          <form className={styles["recipient-email-settings"]} onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>IT Team Email Address:</td>
                  <td>
                    <input
                      type="email"
                      name="itTeamEmailAddress"
                      placeholder="it@dksh.com"
                      defaultValue={initialITTeamEmailAddress}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Admin Team Email Address:</td>
                  <td>
                    <input
                      type="email"
                      name="adminTeamEmailAddress"
                      placeholder="admin@dksh.com"
                      defaultValue={initialAdminTeamEmailAddress}
                    />
                  </td>
                </tr>
                <tr>
                  <td>HR Team Email Address:</td>
                  <td>
                    <input
                      type="email"
                      name="hrTeamEmailAddress"
                      placeholder="hr@dksh.com"
                      defaultValue={initialHRTeamEmailAddress}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="module-button">
              Save
            </button>
          </form>
        </div>
        </div>
      )}

      {activeTab === "Account" && (
        <div className={styles.tabContent}>
           <div className={styles.tabContentBox}>
           <h5 className="test">Test</h5>
          {/* Add content for the Account tab here */}
        </div>
        </div>
      )}
    </>
  );
}
