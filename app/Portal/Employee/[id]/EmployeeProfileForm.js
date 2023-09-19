"use client";

import "font-awesome/css/font-awesome.min.css";
import styles from "./employee.module.css";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EmployeeProfileForm({ employeeProfile }) {
  const router = useRouter();
  const employeeIdRef = useRef(null);
  const [redirecting, setRedirecting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (redirecting) {
      return;
    }
    setRedirecting(true);

    const res = await fetch(employeeProfile ? `/api/employee/${encodeURIComponent(employeeProfile._id)}` : "/api/employee", {
      method: employeeProfile ? "PUT" : "POST",
      body: new FormData(e.target)
    });

    const data = await res.json();

    if (!res.ok) {
      setRedirecting(false);
      alert(data.error);
      return;
    }

    if (data.status === "idExists") {
      setRedirecting(false);
      employeeIdRef.current.setCustomValidity("Employee ID already exists.");
      employeeIdRef.current.reportValidity();
      return;
    }

    router.push("/Portal/Onboarding-BackgroundCheck");
    router.refresh();
  }

  const gender = employeeProfile?.gender ?? "Male";

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formBody}>
        {employeeProfile && (
          <div className={styles["image-container"]}>
            <Image
              src={`/api/employee/${encodeURIComponent(employeeProfile?._id)}/profileImage?${new Date().getTime()}`}
              alt="test"
              fill
              style={{ objectFit: "cover", borderRadius: "50%" }}
              unoptimized
            />
          </div>
        )}
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
                      defaultValue={employeeProfile?.firstName}
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
                      className={styles.input}
                      name="lastName"
                      defaultValue={employeeProfile?.lastName}
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
                  className={styles.input}
                  name="phone"
                  defaultValue={employeeProfile?.phone}
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
                      className={styles.input}
                      name="dob"
                      defaultValue={employeeProfile?.dob}
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
                      className={styles.radioInput}
                      name="gender"
                      value="Male"
                      defaultChecked={gender === "Male"}
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
                      defaultChecked={gender === "Female"}
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
                  defaultValue={employeeProfile?.addressLine1}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className={styles.input}
                  name="addressLine2"
                  defaultValue={employeeProfile?.addressLine2}
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
                      className={styles.input}
                      name="postalCode"
                      defaultValue={employeeProfile?.postalCode}
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
                      className={styles.input}
                      name="city"
                      defaultValue={employeeProfile?.city}
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
                      className={styles.input}
                      name="state"
                      defaultValue={employeeProfile?.state}
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
                      className={styles.input}
                      name="country"
                      defaultValue={employeeProfile?.country}
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
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
                  defaultValue={employeeProfile?.email}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-envelope"></i>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  ref={employeeIdRef}
                  type="text"
                  placeholder="Employee ID"
                  className={styles.input}
                  name="_id"
                  defaultValue={employeeProfile?._id}
                  required
                  onChange={e => {
                    e.target.setCustomValidity("");
                    e.target.reportValidity();
                  }}
                  readOnly={!!employeeProfile}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-id-card"></i>
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
                      defaultValue={employeeProfile?.position}
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
                      name="department"
                      defaultValue={employeeProfile?.department}
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
                    name="profileImage"
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