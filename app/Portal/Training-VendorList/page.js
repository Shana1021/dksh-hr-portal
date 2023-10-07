"use client";

import React, { useState } from "react";
import Table from "../Table";
import styles from "./Training-VendorList.module.css";
import SearchBar from "../SearchBar";

const TableItems = [
  {
    _id: 1,
    name: "Oracle",
    number: "12345",
    address: "Selangor",
    vendor: "Training Co.",
    email: "john@example.com",
  },
];

export default function VendorList() {
  return (
    <div className={styles["container"]}>
      <SearchBar />
      <Table
        columns={[
          { key: "_id", title: "Vendor_ID" },
          { key: "name", title: "Name" },
          { key: "number", title: "Number" },
          { key: "address", title: "Address" },
          { key: "vendor", title: "Vendor Details" },
          { key: "email", title: "Email Status" },
        ]}
        data={TableItems}
        height="400px"
      />
      <div className={styles["actions"]}>
        <button className="module-button">ADD Vendor</button>
      </div>
    </div>
  );
}
