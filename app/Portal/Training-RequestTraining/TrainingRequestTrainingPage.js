"use client";

import styles from "./training-requesttraining.module.css";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaIdCard, FaUserTie } from "react-icons/fa"; //User 
import { ImLocation } from "react-icons/im"; //address
import { FaMapLocationDot } from "react-icons/fa6"; //Country,State
import { FaLocationCrosshairs } from "react-icons/fa6"; //PostCode
import { IoCalendar } from "react-icons/io5"; //Calendar
import { BiSolidHourglass, BiSolidPhone } from "react-icons/bi"; //Duration Hourglass and Phone
import { AiOutlineDollar } from "react-icons/ai"; //Money
import { IoMdMail } from "react-icons/io"; //Email
import { MdOutlineCardMembership } from "react-icons/md"; //Title

export default function TrainingRequestTrainingPage({ vendorCodes }) {
  const router = useRouter();
  const vendorCodeRef = useRef(null);
  const employeeIdRef = useRef(null);
  const [vendorChoice, setVendorChoice] = useState("Existing Vendor");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/training", {
      method: "POST",
      body: new FormData(e.target)
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }

    const data = await res.json();

    if (data.status === "employeeIdDoesNotExist") {
      employeeIdRef.current.setCustomValidity("This employee does not exist.");
      employeeIdRef.current.reportValidity();
      return;
    }

    if (data.status === "vendorCodeAlreadyExists") {
      vendorCodeRef.current.setCustomValidity("Vendor Code already exists.");
      vendorCodeRef.current.reportValidity();
      return;
    }

    router.push("/Portal/Training-StatusCheck");
    router.refresh();
  }

  return (
    <form className={styles.formBody} onSubmit={handleSubmit}>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          {/* Course Details */}
          <div className={styles.row}>
            <h4 className={styles.h4}>Course Details</h4>
            <div className={styles.row}>
              <div
                className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <MdOutlineCardMembership />
                </div>
              </div>
              <div
                className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
              >
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="Address Line 1"
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <ImLocation />
                </div>
              </div>
              <div
                className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
              >
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Address Line 2"
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
                      name="postalCode"
                      placeholder="Postal Code"
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
                      name="city"
                      placeholder="City"
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
                      name="state"
                      placeholder="State"
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
                      name="country"
                      placeholder="Country"
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <FaMapLocationDot />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                >
                  <input
                    type="datetime-local"
                    name="datetime"
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                    <IoCalendar />
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="number"
                      name="totalHours"
                      placeholder="Total Hours"
                      min="0"
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <BiSolidHourglass />
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="number"
                      name="fee"
                      placeholder="Course Fee"
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <AiOutlineDollar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Vendor Details */}
        <div className={styles.form}>
          <div className={styles.row}>
            <h4 className={styles.h4}>Vendor Details</h4>
            <h5 className={styles.h5}>Choose vendor choice:</h5>
            <div className={styles.inputGroup}>
              <input
                id="existingVendor"
                type="radio"
                name="vendorChoice"
                value="Existing Vendor"
                checked={vendorChoice === "Existing Vendor"}
                onChange={() => setVendorChoice("Existing Vendor")}
                className={styles.radioInput}
              />
              <label htmlFor="existingVendor" className={styles.label}>
                Existing Vendor
              </label>
              <input
                id="newVendor"
                type="radio"
                name="vendorChoice"
                value="New Vendor"
                checked={vendorChoice === "New Vendor"}
                onChange={() => setVendorChoice("New Vendor")}
                className={styles.radioInput}
              />
              <label htmlFor="newVendor" className={styles.label}>
                New Vendor
              </label>
              <input
                id="noVendor"
                type="radio"
                name="vendorChoice"
                value="No Vendor"
                checked={vendorChoice === "No Vendor"}
                onChange={() => setVendorChoice("No Vendor")}
                className={styles.radioInput}
              />
              <label htmlFor="noVendor" className={styles.label}>
                No Vendor
              </label>
            </div>

            {/* Rendering fields conditionally based on selected vendor */}
            {vendorChoice === "Existing Vendor" && (
              <div className={styles.row}>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorCode}`}
                >
                  <select
                    className={`${styles.input} ${styles.inputDropdown}`}
                    name="vendorCode"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled hidden>Select Vendor Code</option>
                    {vendorCodes.map(vendorCode => (
                      <option key={vendorCode} value={vendorCode}>{vendorCode}</option>
                    ))}
                  </select>
                  <div className={styles.inputIcon}>
                    <FaIdCard />
                  </div>
                </div>
              </div>
            )}
            {vendorChoice === "New Vendor" && (
              <div className={styles.row}>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorName}`}
                >
                  <input
                    ref={vendorCodeRef}
                    type="text"
                    name="vendorCode"
                    placeholder="Vendor Code"
                    required
                    onChange={e => {
                      e.target.setCustomValidity("");
                      e.target.reportValidity();
                    }}
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                    <FaIdCard />
                  </div>
                </div>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorName}`}
                >
                  <input
                    type="text"
                    name="vendorName"
                    placeholder="Vendor Name"
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                    <FaUserTie />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.colHalf}>
                    <div
                      className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorEmail}`}
                    >
                      <input
                        type="email"
                        name="vendorEmail"
                        placeholder="Email"
                        className={styles.input}
                      />
                      <div className={styles.inputIcon}>
                        <IoMdMail />
                      </div>
                    </div>
                  </div>
                  <div className={styles.colHalf}>
                    <div
                      className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorPhone}`}
                    >
                      <input
                        type="tel"
                        name="vendorPhone"
                        placeholder="Phone Number"
                        className={styles.input}
                      />
                      <div className={styles.inputIcon}>
                        <BiSolidPhone />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                  <input
                    id="addVendor"
                    type="checkbox"
                    name="addVendor"
                    className={styles.checkboxInput}
                  />
                  <label className={styles.label} htmlFor="addVendor">
                    Add New Vendor details as an Existing Vendor in the Vendor List.
                  </label>
                </div>
              </div>
            )}
            {vendorChoice === "No Vendor" && (
              <div className={styles.row}>
                <p className={styles.noVendorText}>
                  You have selected &quot;No Vendor.&quot; Please proceed with Employee
                  Details
                </p>
              </div>
            )}

            {/* Employee Details */}
            <h4 className={styles.h4}>Employee Details</h4>
            <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
              <input
                ref={employeeIdRef}
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                required
                onChange={e => {
                  e.target.setCustomValidity("");
                  e.target.reportValidity();
                }}
                className={styles.input}
              />
              <div className={styles.inputIcon}>
                <FaIdCard />
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
    </form>
  );
}
