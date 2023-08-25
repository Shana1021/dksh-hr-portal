"use client";

import styles from "./settings.module.css";
import { useRouter } from "next/navigation";

export default function SettingsPage({
  initialITTeamEmailAddress,
  initialAdminTeamEmailAddress,
  initialHRTeamEmailAddress
}) {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/settings", {
      method: "PUT",
      body: new FormData(e.target)
    });

    router.refresh();
  }

  return (
    <>
      <h1 className={styles["recipient-email-settings-label"]}>Recipient Email Settings</h1>
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
        <button type="submit" className="module-button">Save</button>
      </form>
    </>
  );
}
