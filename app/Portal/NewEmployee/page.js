"use client";
import React, { useState } from "react";
import styles from "./emp.module.css";
import "font-awesome/css/font-awesome.min.css";
import { useRouter } from "next/navigation";
import { Router } from "react-router-dom";

export default function NewEmployee() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  //const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");
  const [number, setNumber] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fname ||
      !lname ||
      !empId ||
      !password ||
      !address1 ||
      !email ||
      !gender ||
      !dob ||
      !city ||
      !state ||
      !code ||
      !number ||
      !department ||
      !position ||
      !country
    ) {
      alert("Fill up all columns");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/HRStaff", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
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
          state,
          position,
          country,
          department,
          code,
          number,
        }),
      });
      if (res.ok) {
        router.push("/Portal/HR-List");
        router.refresh();
      } else {
        throw new Error("Failed");
      }
    } catch (error) {}
  }; //For form to prevent empty submissions
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
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
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
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
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
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
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
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
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
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
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
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
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
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
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
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
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
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
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
                      value={state}
                      onChange={(e) => setState(e.target.value)}
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
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
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
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
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
