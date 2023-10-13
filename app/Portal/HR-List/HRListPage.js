"use client";

import { useState } from "react";
import styles from "./hr-list.module.css";
import Table from "../Table";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "../ConfirmationDialog";
import SearchBar from "../SearchBar";
export default function HRListPage({ hrProfiles, totalRows }) {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState(null);

  for (const hrProfile of hrProfiles) {
    hrProfile.id = (
      <Link href={`/Portal/HR/${encodeURIComponent(hrProfile._id)}`}>
        {hrProfile._id}
      </Link>
    );
    hrProfile.action = (
      <FiTrash
        className="delete-button"
        onClick={() =>
          setConfirmation({
            message: "Are you sure you want to delete this?",
            async onConfirm() {
              const res = await fetch(
                `/api/hr/${encodeURIComponent(hrProfile._id)}`,
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
    );
  }

  return (
    <>
      <div className={styles["container"]}>
        <SearchBar />

        <Table
          columns={[
            { key: "id", title: "Employee ID" },
            { key: "firstName", title: "Name" },
            { key: "email", title: "Email" },
            { key: "phone", title: "Phone" },
            { key: "action", title: "Action" },
          ]}
          data={hrProfiles}
          height="400px"
          totalRows={totalRows}
        />
        <div className={styles["add-button"]}>
          <button>
            <Link className="module-button" href="/Portal/HR/New">
              Add Employee
            </Link>
          </button>
        </div>
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
