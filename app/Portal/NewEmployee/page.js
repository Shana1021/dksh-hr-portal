"use client";
import React, { useState } from "react";
import "./style.css";

export default function NewEmployee() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <h1>New Employee</h1>
      <div className="Container">
        <input type="text" placeholder="Enter First Name" required />
        <input type="text" placeholder="Enter Middle Name" required />
        <input type="text" placeholder="Enter Last Name" required />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter Employee Password"
          required
        />
        <input type="text" placeholder="Enter Position" required />
        <input type="text" placeholder="Enter Department" required />
        <input type="text" placeholder="Enter Employee ID" required />
        <input type="text" placeholder="Enter Address Line 1" required />
        <input type="text" placeholder="Enter Address Line 2" required />
        <input type="text" placeholder="Enter City" required />
        <input type="text" placeholder="Enter State" required />
        <input type="text" placeholder="Enter Postal Code" required />

        <input
          type="tel"
          placeholder="Enter Phone Number"
          pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}"
          required
        />
        <input type="date" />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter Password"
          required
          id="password"
        />
        <label>
          <input type="checkbox" onClick={togglePasswordVisibility} />
          Show Password
        </label>
      </div>
      <div className="radio">
        <label htmlFor="male"> Male</label>
        <input type="radio" id="male" name="malefemale" value="male" />

        <label htmlFor="female">Female</label>
        <input type="radio" id="female" name="malefemale" value="female" />
      </div>
      <div className="Button">
        <input type="submit" />
      </div>
    </>
  );
}
