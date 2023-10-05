"use client";

import React, { useState } from "react";
import Table from "../Table";
import styles from "./status.module.css";
import SearchBar from "../SearchBar";

const checklistItems = [
  {
    _id: 1,
    name: "John Doe",
    positionID: "12345",
    incharge: "Manager",
    vendor: "Training Co.",
    email: "john@example.com",
  },
];

export default function TrainingStatusCheck() {
  return (
    <>
      <div className={styles["container"]}>
        <SearchBar />
        <Table
          columns={[
            { key: "_id", title: "No" },
            { key: "name", title: "Name" },
            { key: "positionID", title: "ID" },
            { key: "incharge", title: "In-Charge" },
            { key: "vendor", title: "Training Vendor" },
            { key: "email", title: "Email Status" },
          ]}
          data={checklistItems}
          height="400px"
        />
      </div>
      <div className={styles["button"]}>
        <button className="module-button">REFRESH</button>
        <button className="module-button">SEND Email</button>
      </div>
    </>
  );
}
