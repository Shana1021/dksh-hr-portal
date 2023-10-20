"use client";

import styles from "./training-vendorlist.module.css";
import { useState, useEffect } from "react";
import Table from "../Table";
import SearchBar from "../SearchBar";
import { FiTrash } from "react-icons/fi";
import ConfirmationDialog from "../ConfirmationDialog";
import { useRouter } from "next/navigation";

export default function TrainingVendorListPage({ vendors, totalRows }) {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState(null);
  const [filteredVendors, setFilteredVendors] = useState(vendors);

  useEffect(() => setFilteredVendors(vendors), [vendors]);

  const handleSearch = (query) => {
    const filteredData = vendors.filter((vendor) => {
      const searchFields = ["_id", "name", "email", "phone"];
      return searchFields.some((field) =>
        vendor[field].toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredVendors(filteredData);
  };

  for (const vendor of filteredVendors) {
    if (vendor.references === 0) {
      vendor.action = (
        <FiTrash
          className="delete-button"
          onClick={() =>
            setConfirmation({
              message: "Are you sure you want to delete this?",
              async onConfirm() {
                const res = await fetch(`/api/vendor/${encodeURIComponent(vendor._id)}`, {
                  method: "DELETE",
                });
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
  }

  return (
    <>
      <div className={styles["container"]}>
        <SearchBar onSearch={handleSearch} />
        <Table
          columns={[
            { key: "_id", title: "Vendor ID" },
            { key: "name", title: "Name" },
            { key: "email", title: "Email" },
            { key: "phone", title: "Phone" },
            { key: "action", title: "Action" }
          ]}
          data={filteredVendors}
          height="400px"
          totalRows={totalRows}
        />
        <div className={styles["actions"]}>
          <button onClick={() => router.refresh()} className="module-button">Refresh</button>
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
