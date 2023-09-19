"use client";
import { useState } from "react"; // Import useState for client-side state
import styles from "./hr.module.css";
import Table from "../Table";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DeleteConfirmation from "../DeleteConfirmation"; // Import the confirmation dialog component

export default function HRListPage({ hrProfiles }) {
  // Get the client object
  const router = useRouter();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  const handleDelete = async () => {
    if (profileToDelete) {
      const id = profileToDelete._id;
      const res = await fetch(`http://localhost:3000/api/HRStaff?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }

    // Close the confirmation dialog
    setShowDeleteConfirmation(false);
  };

  const openDeleteConfirmation = (profile) => {
    setProfileToDelete(profile);
    setShowDeleteConfirmation(true);
  };

    for (const hrProfile of hrProfiles) {
      hrProfile.action = (
        <>
          <Link href={`./EditNewEmployee/${hrProfile._id}`}>
            <button id={hrProfile.id} className={styles["edit-button"]}>
              <BiEdit className={styles["icon"]} />
            </button>
          </Link>
          {hrProfiles.map((hrProfile) => (
        <div key={hrProfile.id}>
          <button
            className={styles["delete-button"]}
            onClick={() => openDeleteConfirmation(hrProfile)}
            id={hrProfile.id}
          >
            <FiTrash className={styles["icon"]} />
          </button>
        </div>
      ))}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
        />
      )}
        </>
      );
    }
  
  return (
  <div className={styles["container"]}>
    <div className={styles["container-search-button"]}>
      <div className={styles["search-bar"]}>
        <input type="text" placeholder="Filter by Position" />
        <span className={styles["search-icon"]}><FaSearch/></span>
          </div>
              </div>
      <Table
        columns={[
          { key: "_id", title: "ID" },
          { key: "fname", title: "Name" },
          { key: "email", title: "Email" },
          { key: "number", title: "Phone" },
          { key: "action", title: "Action" },
        ]}
        data={hrProfiles}
        height="400px"
      />
      <button className={styles["custom-button"]}>
            <Link href="./NewEmployee">
              <span className={styles["plus-icon"]}>&#43;</span>Add New Employee
              </Link>
              </button>
    </div>
  );
}