"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Table from "./table";
import Link from "next/link";

export default function HRPage() {
    const [scrollWidth, setScrollWidth] = useState(0);

    //for scrollbar - not complete
    useEffect(() => {
      // Calculate the scrollbar width
      const calculateScrollbarWidth = () => {
        const tblContent = document.querySelector(".tbl-content");
      const tblTable = document.querySelector(".tbl-content table");

      if (tblContent && tblTable) {
        const tblContentWidth = tblContent.offsetWidth;
        const tblTableWidth = tblTable.offsetWidth;
        const scrollbarWidth = tblContentWidth - tblTableWidth;
        return scrollbarWidth;
      }

      return 0; // Return 0 if elements are not found (optional)
    };
      // Set the scrollbar width in state
      setScrollWidth(calculateScrollbarWidth());
    const handleResize = () => {
      setScrollWidth(calculateScrollbarWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
      <div className="container">
      <h1>HR List</h1>
      <div className="container-search-button">
      <div className="search-bar">
        <input type="text" placeholder="Filter by Position" />
        <span className="search-icon">&#128269;</span>
      </div>
      <button className="custom-button">
        <Link href="./NewEmployee">
        <span className="plus-icon">&#43;</span>Add New Employee
        </Link>
      </button>
      </div>
      <Table className="hr-table"></Table>
    </div>
  );
}