"use client";

import styles from "./training-vendorlist.module.css";
import { useState, useEffect } from "react";
import Table from "../Table";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TrainingVendorListPage({ vendors, totalRows }) {
  const router = useRouter();
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
    vendor.id = (
      <Link
        href={`/Portal/Vendor/${encodeURIComponent(vendor._id)}`}
      >
        {vendor._id}
      </Link>
    );
  }

  return (
    <div className={styles["container"]}>
      <SearchBar onSearch={handleSearch} />
      <Table
        columns={[
          { key: "id", title: "Vendor Code" },
          { key: "name", title: "Name" },
          { key: "email", title: "Email" },
          { key: "phone", title: "Phone" }
        ]}
        data={filteredVendors}
        height="400px"
        totalRows={totalRows}
      />
      <div className={styles["actions"]}>
          <Link className="module-button" href="/Portal/Vendor">Add Vendor</Link>
        <button onClick={() => router.refresh()} className="module-button">Refresh</button>
      </div>
    </div>
  );
}
