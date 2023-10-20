"use client";

import "font-awesome/css/font-awesome.min.css";
import styles from "./profile.module.css";
import Image from "next/image";
import { BiSolidPhone } from "react-icons/bi";
import { FaUserTie, FaIdCard } from "react-icons/fa";
import { FaLocationCrosshairs, FaMapLocationDot, FaBuildingUser } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { ImLocation, ImBriefcase } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { useRef } from "react";

export default function Profile({ profile }) {
  const employeeIdRef = useRef(null);

  return (
    <form>
      <div className={styles.formBody}>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
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
                      className={styles.input}
                      name="firstName"
                      defaultValue={profile.firstName}
                    />
                    <div className={styles.inputIcon}>
                      <FaUserTie />
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
                      className={styles.input}
                      name="lastName"
                      defaultValue={profile.lastName}
                    />
                    <div className={styles.inputIcon}>
                      <FaUserTie />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={styles.input}
                  name="phone"
                  defaultValue={profile.phone}
                />
                <div className={styles.inputIcon}>
                  <BiSolidPhone />
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
                      className={styles.input}
                      name="dob"
                      defaultValue={profile.dob}
                    />
                    <div className={styles.inputIcon}>
                      <IoCalendar />
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
                      className={styles.radioInput}
                      name="gender"
                      value="Male"
                      defaultChecked={profile.gender === "Male"}
                    />
                    <label className={styles.label} htmlFor="gender-male">
                      Male
                    </label>
                    <input
                      id="gender-female"
                      type="radio"
                      className={styles.radioInput}
                      name="gender"
                      value="Female"
                      defaultChecked={profile.gender === "Female"}
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
                  className={styles.input}
                  name="addressLine1"
                  defaultValue={profile.addressLine1}
                />
                <div className={styles.inputIcon}>
                  <ImLocation />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className={styles.input}
                  name="addressLine2"
                  defaultValue={profile.addressLine2}
                />
                <div className={styles.inputIcon}>
                  <ImLocation />
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
                      className={styles.input}
                      name="postalCode"
                      defaultValue={profile.postalCode}
                    />
                    <div className={styles.inputIcon}>
                      <FaLocationCrosshairs />
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
                      className={styles.input}
                      name="city"
                      defaultValue={profile.city}
                    />
                    <div className={styles.inputIcon}>
                      <FaMapLocationDot />
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
                      className={styles.input}
                      name="state"
                      defaultValue={profile.state}
                    />
                    <div className={styles.inputIcon}>
                      <FaLocationCrosshairs />
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
                      className={styles.input}
                      name="country"
                      defaultValue={profile.country}
                    />
                    <div className={styles.inputIcon}>
                      <FaMapLocationDot/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className={styles.form}>
            <div className={styles.row}>
              <h4 className={styles.h4}>Account Details</h4>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={styles.input}
                  name="email"
                  defaultValue={profile.email}
                />
                <div className={styles.inputIcon}>
                  <IoMdMail />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  ref={employeeIdRef}
                  type="text"
                  placeholder="Employee ID"
                  className={styles.input}
                  name="_id"
                  defaultValue={profile._id}
                  required
                  onChange={e => {
                    e.target.setCustomValidity("");
                    e.target.reportValidity();
                  }}
                  readOnly
                />
                <div className={styles.inputIcon}>
                  <FaIdCard />
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
                      name="position"
                      defaultValue={profile.position}
                    />
                    <div className={styles.inputIcon}>
                      <ImBriefcase />
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
                      name="department"
                      defaultValue={profile.department}
                    />
                    <div className={styles.inputIcon}>
                      <FaBuildingUser />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["image-container"]}>
                <Image
                  src={`/api/hr/${encodeURIComponent(
                    profile._id
                  )}/profileImage?${new Date().getTime()}`}
                  alt="Profile Image"
                  fill
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                  unoptimized
                />
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
                    name="profileImage"
                  />
                  <div className={styles.inputIcon}>
                    <MdFileUpload />
                  </div>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <button type="submit" className={styles.button}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
