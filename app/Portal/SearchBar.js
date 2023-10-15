"use client";
import React, { useState } from "react";
import styles from "./search.module.css";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); //accepts automatic typing search
  };

  const handleSearchClick = () => {
    //button click
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    //enter keyboard key
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["main"]}>
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange || handleInputChange2}
          onKeyPress={handleKeyPress}
        />
        <button className={styles["i"]} onClick={handleSearchClick}>
          <BiSearchAlt2 className={styles["a"]} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
