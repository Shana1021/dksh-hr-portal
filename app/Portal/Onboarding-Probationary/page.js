'use client';

import styles from './on.module.css';
import Table from "../Table";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

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

export default function Probationary() {
  return (
      <div className={styles["container"]}>
        <div className={styles["container-search-button"]}>
          <div className={styles["search-bar"]}>
            <input type="text" placeholder="Filter by Status" />
            <span className={styles["search-icon"]}><FaSearch/></span>
          </div>
        </div>
        <Table
          columns={[
            { key: "_id", title: "No" },
            { key: "name", title: "Name" },
            { key: "positionID", title: "ID" },
            { key: "startdate", title: "Start Date" },
            { key: "enddate", title: "End Date" },
            { key: "email", title: "Email Status", }
          ]}
          data={checklistItems}
          height="400px"
          />
        </div>
    )
}