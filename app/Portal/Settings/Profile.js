"use client";
import styles from "./profile.module.css";
import Image from "next/image";
import { BiSolidPhone } from "react-icons/bi";
import { FaUserTie, FaIdCard } from "react-icons/fa";
import { FaLocationCrosshairs, FaMapLocationDot, FaBuildingUser } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { ImLocation, ImBriefcase } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BsFillEyeSlashFill } from 'react-icons/bs';

export default function Profile({ profile }) {
  const router = useRouter();
  const employeeIdRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/hr/${encodeURIComponent(profile._id)}`, {
      method: "PUT",
      body: new FormData(e.target),
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }

    router.refresh();
  }

  return (
    <form className={styles.formBody} onSubmit={handleSubmit}>
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
                    name="firstName"
                    defaultValue={profile.firstName}
                    className={styles.input}
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
                    name="lastName"
                    defaultValue={profile.lastName}
                    className={styles.input}
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
                name="phone"
                defaultValue={profile.phone}
                className={styles.input}
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
                    name="dob"
                    defaultValue={profile.dob && profile.dob.toISOString().split('T')[0]}
                    className={styles.input}
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
                    name="gender"
                    value="Male"
                    defaultChecked={profile.gender === "Male"}
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
                    defaultChecked={profile.gender === "Female"}
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
                name="addressLine1"
                defaultValue={profile.addressLine1}
                className={styles.input}
              />
              <div className={styles.inputIcon}>
                <ImLocation />
              </div>
            </div>
            <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
              <input
                type="text"
                placeholder="Address Line 2"
                name="addressLine2"
                defaultValue={profile.addressLine2}
                className={styles.input}
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
                    name="postalCode"
                    defaultValue={profile.postalCode}
                    className={styles.input}
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
                    name="city"
                    defaultValue={profile.city}
                    className={styles.input}
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
                    name="state"
                    defaultValue={profile.state}
                    className={styles.input}
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
                    name="country"
                    defaultValue={profile.country}
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                    <FaMapLocationDot />
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
                name="email"
                required
                defaultValue={profile.email}
                className={styles.input}
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
                name="_id"
                defaultValue={profile._id}
                required
                onChange={(e) => {
                  e.target.setCustomValidity("");
                  e.target.reportValidity();
                }}
                readOnly
                className={styles.input}
              />
              <div className={styles.inputIcon}>
                <FaIdCard />
              </div>
            </div>
            <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                minLength={5}
                maxLength={20}
                className={styles.input}
              />
              <div className={styles.inputIcon}>
                {passwordVisible ? (
                  <BsFillEyeSlashFill onClick={() => setPasswordVisible(!passwordVisible)} />
                ) : (
                  <BsFillEyeSlashFill onClick={() => setPasswordVisible(!passwordVisible)} />
                )}
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
            {/* Submit Button */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <button
                  type="submit"
                  className={styles.button}
                >
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
