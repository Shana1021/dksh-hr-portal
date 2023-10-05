"use client";
import styles from "./search.module.css";
import { BiSearchAlt2 } from "react-icons/bi";
export default function SearchBar() {
  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["main"]}>
          <input type="search" placeholder="Search..." />
          <a href="#" className={styles["i"]}>
            <BiSearchAlt2 className={styles["a"]} />
          </a>
        </div>
      </div>
    </>
  );
}
