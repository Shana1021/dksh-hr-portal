'use client';

import styles from './onboarding-probationary.module.css';
import Table from "../Table";
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

export default function ProbationaryPage({ probationaries, totalRows }) {
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
          { key: "_id", title: "Employee ID" },
          { key: "firstName", title: "First Name" },
          { key: "lastName", title: "Last Name" }
        ]}
        data={probationaries}
        height="400px"
      />
    </div>
  )
}