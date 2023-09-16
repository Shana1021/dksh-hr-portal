"use client";
import React, { useState } from "react";
import styles from "./emp.module.css";
import "font-awesome/css/font-awesome.min.css";
import { useRouter } from "next/navigation";
import { Router } from "react-router-dom";
export default function Edit({
  id,
  fname,
  lname,
  empId,
  password,
  address1,
  address2,
  email,
  gender,
  dob,
  city,
  country,
  state,
  department,
  position,
  code,
  number,
}) {
  const [newFname, setNewFname] = useState(fname);
  const [newLname, setNewLname] = useState(lname);
  const [newEmpId, setNewEmpId] = useState(empId);
  const [newPassword, setNewPassword] = useState(password);
  const [newAddress1, setNewAddress1] = useState(address1);
  const [newAddress2, setNewAddress2] = useState(address2);
  //const [image, setImage] = useState("");
  const [newEmail, setNewEmail] = useState(email);
  const [newGender, setNewGender] = useState(gender);
  const [newDOB, setNewDOB] = useState(dob);
  const [newCity, setNewCity] = useState(city);
  const [newCountry, setNewCountry] = useState(country);
  const [newState, setNewState] = useState(state);
  const [newPosition, setNewPosition] = useState(position);
  const [newDepartment, setNewDepartment] = useState(department);
  const [newCode, setNewCode] = useState(code);
  const [newNumber, setNewNumber] = useState(number);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/HRStaff/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newFname,
          newLname,
          newEmpId,
          newPassword,
          newAddress1,
          newAddress2,
          newEmail,
          newGender,
          newDOB,
          newCountry,
          newCity,
          newState,
          newPosition,
          newDepartment,
          newCode,
          newNumber,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update ");
      }
      router.push("/Portal/HR-List");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.formBody}>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            {/* Personal Details */}
            <div className={styles.row}>
              <h4 className={styles.h4}>Personal Details</h4>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="First Name"
                      value={newFname}
                      onChange={(e) => setNewFname(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-user"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={newLname}
                      onChange={(e) => setNewLname(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-user"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-phone"></i>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                  <h5 className={styles.h5}>Date of Birth</h5>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="date"
                      value={newDOB}
                      onChange={(e) => setNewDOB(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-calendar"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                  <h5 className={styles.h5}>Gender</h5>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      id="gender-male"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={newGender === "Male"}
                      onChange={() => setNewGender("Male")}
                      className={styles.radioInput}
                    />
                    <label className={styles.label} htmlFor="gender-male">
                      Male
                    </label>
                    <input
                      id="gender-female"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={newGender === "Female"}
                      onChange={() => setNewGender("Female")}
                      className={styles.radioInput}
                    />
                    <label className={styles.label} htmlFor="gender-female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Residential Details */}
            <div className={styles.row}>
              <h4 className={styles.h4}>Residential Details</h4>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={newAddress1}
                  onChange={(e) => setNewAddress1(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={newAddress2}
                  onChange={(e) => setNewAddress2(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="City"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="State"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="Country"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Account Details */}
          <form className={styles.form}>
            <div className={styles.row}>
              <h4 className={styles.h4}>Account Details</h4>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-envelope"></i>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={newEmpId}
                  onChange={(e) => setNewEmpId(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-id-card"></i>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i
                    className={`fa ${
                      passwordVisible ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
              </div>
              {/* Position */}
              <div className={styles.row}>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="Position"
                      className={styles.input}
                      value={newPosition}
                      onChange={(e) => setNewPosition(e.target.value)}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-briefcase"></i>
                    </div>
                  </div>
                </div>
                {/* Department */}
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="Department"
                      className={styles.input}
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-building"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image Upload */}
              <div className={styles.row}>
                <h5 className={styles.h5}>Profile Image Upload</h5>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                    <i className="fa fa-upload"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <button
                  type="submit"
                  className={styles.button}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
