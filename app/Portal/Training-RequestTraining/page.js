"use client";
import React, { useState } from "react";
import styles from "./req.module.css";
import { useRouter } from "next/navigation";

//icons
import { FaUserAlt} from "react-icons/fa"; //User
import { FaMapMarkerAlt } from "react-icons/fa"; //Address
import { FaMapLocationDot } from "react-icons/fa6"; //Country,State
import { FaLocationCrosshairs } from "react-icons/fa6"; //PostCode
import { BiCalendar } from "react-icons/bi"; //Calendar
import { AiOutlineClockCircle } from "react-icons/ai"; //Time Clock
import { BiSolidHourglass } from "react-icons/bi"; //Duration Hourglass
import { AiOutlineDollar } from "react-icons/ai"; //Money
import { HiOutlineIdentification } from "react-icons/hi2"; //ID
import { AiOutlineMail } from "react-icons/ai"; //Email
import { BsTelephone } from "react-icons/bs"; //Phone
import { FaIdCard } from "react-icons/fa6"; //Position
import { HiOutlineOfficeBuilding} from "react-icons/hi"; //Department
import { FiUpload } from "react-icons/fi"; //Upload
import { MdOutlineCardMembership} from "react-icons/md"; //Title

export default function TrainingRequestTraining() {
  // To store the vendor code
  const [vendorCode, setVendorCode] = useState("");
  const [vendor, setVendor] = useState("Existing Vendor");
  const [title, setTitle] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState("");
  const [fee, setFee] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [venderEmail, setVenderEmail] = useState("");
  const [venderNumber, setVendorNumber] = useState("");
  const [vendorNameCode, setVenderNameCode] = useState("");
  const [E_name, setE_name] = useState("");
  const [E_email, setE_mail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isVendorChecked, setVendorIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleVendorCheckboxChange = () => {
    setVendorIsChecked(!isVendorChecked);
  };


  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !address1 ||
      !code ||
      !city ||
      !state ||
      !country ||
      !date ||
      !time ||
      !hours ||
      !fee ||
      !E_name ||
      !E_email
    ) {
      alert("Fill up all columns");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/Training", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          address1,
          address2,
          code,
          city,
          state,
          country,
          date,
          time,
          hours,
          fee,
          vendorName,
          venderEmail,
          venderNumber,
          vendorNameCode,
          E_name,
          E_email,
        }),
      });
      if (res.ok) {
        router.push("/Portal/Training-StatusCheck");
      } else {
        throw new Error("Failed");
      }
    } catch (error) {}
  };

  // Function to handle changes in the input field
  const handleVendorCodeChange = (event) => {
    setVendorCode(event.target.value);

    const handleClick = () => {
      alert("Button clicked!");
    };
  };

  // Function to toggle visibility of vendor fields based on radio button selection
  function toggleVendorFields(event) {
    setVendor(event.target.value);
  }

  return (
    <>
      <div className={styles.formBody}>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            {/* Course Details */}
            <div className={styles.row}>
              <h4 className={styles.h4}>Course Details</h4>
              <div className={styles.row}>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                >
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                    <MdOutlineCardMembership/>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                >
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                  <FaMapMarkerAlt />
                  </div>
                </div>
                <div
                  className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                >
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className={styles.input}
                  />
                  <div className={styles.inputIcon}>
                  <FaMapMarkerAlt />
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={styles.input}
                      />
                      <div className={styles.inputIcon}>
                      <FaMapLocationDot />
                      </div>
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
                      type="date"
                      className={styles.input}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <div className={styles.inputIcon}>
                      <BiCalendar/>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="Course Time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <AiOutlineClockCircle/>
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
                      placeholder="Total Hours"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <BiSolidHourglass/>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon}`}
                  >
                    <input
                      type="text"
                      placeholder="Course Fee"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                    <AiOutlineDollar/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* Vendor Details */}
          <form className={styles.form}>
            <div className={styles.row}>
              <h4 className={styles.h4}>Vendor Details</h4>
              <h5 className={styles.h5}>Choose vendor choice:</h5>
              <div className={styles.inputGroup}>
                <input
                  type="radio"
                  id="eVendor"
                  name="vendor"
                  checked={vendor === "Existing Vendor"}
                  onChange={toggleVendorFields}
                  value="Existing Vendor"
                  className={styles.radioInput}
                />
                <label htmlFor="eVendor" className={styles.label}>
                  Existing Vendor
                </label>
                <input
                  type="radio"
                  id="newVendor"
                  name="vendor"
                  checked={vendor === "New Vendor"}
                  onChange={toggleVendorFields}
                  value="New Vendor"
                  className={styles.radioInput}
                />
                <label htmlFor="newVendor" className={styles.label}>
                  New Vendor
                </label>
                <input
                  type="radio"
                  id="noVendor"
                  name="vendor"
                  checked={vendor === "No Vendor"}
                  onChange={toggleVendorFields}
                  value="No Vendor"
                  className={styles.radioInput}
                />
                <label htmlFor="noVendor" className={styles.label}>
                  No Vendor
                </label>
              </div>

              {/* Rendering fields conditionally based on selected vendor */}
              {vendor === "Existing Vendor" && (
                <div className={styles.row}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorCode}`}
                  >
                    <select
                      value={vendorNameCode}
                      onChange={(e) => setVenderNameCode(e.target.value)}
                      className={`${styles.input} ${styles.inputDropdown}`}
                    >
                      <option value="" disabled>Select Vendor Code</option>
                      <option value="vendorCode1">Vendor Code 1</option>
                      <option value="vendorCode2">Vendor Code 2</option>
                      <option value="vendorCode3">Vendor Code 3</option>
                      {/* Add more options as needed */}
                    </select>
                    <div className={styles.inputIcon}>
                      <FaIdCard />
                    </div>
                  </div>
                </div>
              )}
              {vendor === "New Vendor" && (
                <div className={styles.row}>
                  <div
                    className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorName}`}
                  >
                    <input
                      type="text"
                      placeholder="Vendor Name"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.inputIcon}>
                      <FaUserAlt/>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.colHalf}>
                      <div
                        className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorEmail}`}
                      >
                        <input
                          type="email"
                          placeholder="Email"
                          value={venderEmail}
                          onChange={(e) => setVenderEmail(e.target.value)}
                          className={styles.input}
                        />
                        <div className={styles.inputIcon}>
                          <AiOutlineMail/>
                        </div>
                      </div>
                    </div>
                    <div className={styles.colHalf}>
                      <div
                        className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorPhone}`}
                      >
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={venderNumber}
                          onChange={(e) => setVendorNumber(e.target.value)}
                          className={styles.input}
                        />
                        <div className={styles.inputIcon}>
                          <BsTelephone/>
                        </div>
                      </div>
                    </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  id="addVendor"
                  type="checkbox"
                  className={styles.checkboxInput} 
                  checked={isVendorChecked}
                  onChange={handleVendorCheckboxChange}
                />
                <label className={styles.label} htmlFor="addVendor"> 
                  Add New Vendor details as an Existing Vendor in the Vendor List.
                </label>
              </div>
                  </div>
                </div>
              )}
              {vendor === "No Vendor" && (
                <div className={styles.row}>
                  <p className={styles.noVendorText}>
                    You have selected "No Vendor." Please proceed with Employee
                    Details
                  </p>
                </div>
              )}

              {/* Employee Details */}
              <h4 className={styles.h4}>Employee Details</h4>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={E_name}
                  onChange={(e) => setE_name(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <FaUserAlt/>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={E_email}
                  onChange={(e) => setE_mail(e.target.value)}
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <AiOutlineMail/>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className={styles.row}>
              <h4 className={styles.h4}>Terms and Conditions</h4>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  id="terms"
                  type="checkbox"
                  className={styles.checkboxInput} 
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label className={styles.label} htmlFor="terms"> 
                  I accept the terms and conditions for signing up to this
                  service, and hereby confirm I have read the privacy policy.
                </label>
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
