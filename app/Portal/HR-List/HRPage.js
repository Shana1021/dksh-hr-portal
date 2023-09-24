"use client";
import { useState } from "react"; // Import useState for client-side state
import styles from "./hr.module.css";
import Table from "../Table";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "../ConfirmationDialog"; // Import the confirmation dialog component

export default function HRListPage({ hrProfiles, totalRows }) {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState(null);

  for (const hrProfile of hrProfiles) {
    hrProfile.empId = (
      <Link href={`./EditNewEmployee/${hrProfile._id}`}>{hrProfile.empId}</Link>
    );
    hrProfile.action = (
      <>
        <Link
          className="edit-button"
          href={`./EditNewEmployee/${hrProfile._id}`}
        >
          <BiEdit />
        </Link>
        <FiTrash
          className="delete-button"
          onClick={() =>
            setConfirmation({
              message: "Are you sure you want to delete this?",
              async onConfirm() {
                const res = await fetch(
                  `/api/HRStaff?id=${encodeURIComponent(hrProfile._id)}`,
                  {
                    method: "DELETE",
                  }
                );
                if (!res.ok) {
                  alert(res.statusText);
                  return;
                }

                router.refresh();
              },
            })
          }
        />
      </>
    );
  }

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["container-search-button"]}>
          <div className={styles["search-bar"]}>
            <input type="text" placeholder="Filter by Position" />
            <span className={styles["search-icon"]}>
              <FaSearch />
            </span>
          </div>
        </div>
        <Table
          columns={[
            { key: "empId", title: "ID" },
            { key: "fname", title: "Name" },
            { key: "email", title: "Email" },
            { key: "number", title: "Phone" },
            { key: "action", title: "Action" },
          ]}
          data={hrProfiles}
          height="400px"
          totalRows={totalRows}
        />
        <Link className={styles["custom-button"]} href="./NewEmployee">
          <span className={styles["plus-icon"]}>&#43;</span>&nbsp;Add HR
          Employee
        </Link>
      </div>
      {confirmation && (
        <ConfirmationDialog
          onConfirm={() => {
            setConfirmation(null);
            confirmation.onConfirm();
          }}
          onClose={() => setConfirmation(null)}
        >
          {confirmation.message}
        </ConfirmationDialog>
      )}
    </>
  );
}
