"use client";
import React, { useState } from "react";
import styles from "./req.module.css";
import 'font-awesome/css/font-awesome.min.css';

export default function TrainingRequestTraining() {
   // To store the vendor code
   const [vendorCode, setVendorCode] = useState('');
   const [vendor, setVendor] = useState("Existing Vendor");

   // Function to handle changes in the input field
   const handleVendorCodeChange = (event) => {
    setVendorCode(event.target.value);

    const handleClick = () => {
      alert('Button clicked!');
    }
  }

   // Function to toggle visibility of vendor fields based on radio button selection
   function toggleVendorFields(event) {
    setVendor(event.target.value);
  }

  return (
    <>
 <div className={styles.formBody}>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            {/* Course Details */}
            <div className={styles.row}>
              <h4 className={styles.h4}>Course Details</h4>
              <div className={styles.row}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input type="text" placeholder="Course Title" className={styles.input}/>
                    <div className={styles.inputIcon}>
                      <i className="fa fa-window-maximize"></i>
                    </div>
                  </div>
              </div>
            <div className={styles.row}>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Address Line 1"
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
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input
                      type="text"
                      placeholder="City"
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
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input
                      type="text"
                      placeholder="State"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input
                      type="text"
                      placeholder="Country"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-map-marker"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                        type="date"
                        className={styles.input}
                      />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-calendar"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input
                      type="text"
                      placeholder="Course Time"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-clock-o"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input
                      type="text"
                      placeholder="Total Hours"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-hourglass"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                    <input
                      type="text"
                      placeholder="Course Fee"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-money"></i>
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
            <div className={styles.link}>
            <a href="https://docs.google.com/spreadsheets/d/1pHkJ47-xBV_M-ebJQFYA8MKjsTqSZDQxVKp_NwXcwmM/edit?usp=sharing">
              Click to view Vendor List
            </a>
          </div>
          </div>

           {/* Rendering fields conditionally based on selected vendor */}
           {vendor === "Existing Vendor" && (
            <div className={styles.row}>
               <div className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorCode}`}>
                <input
                  type="text"
                  placeholder="Vendor Code"
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-id-card"></i>
                </div>
              </div>
            </div>
           )}
          {vendor === "New Vendor" && (
              <div className={styles.row}>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorName}`}>
                <input
                  type="text"
                  placeholder="Vendor Name"
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-user"></i>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorEmail}`}>
                    <input
                      type="email"
                      placeholder="Email"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-envelope"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.colHalf}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon} ${styles.inputGroupVendorPhone}`}>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className={styles.input} 
                    />
                    <div className={styles.inputIcon}>
                      <i className="fa fa-phone"></i>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          )}
           {vendor === "No Vendor" && (
            <div className={styles.row}>
              <p className={styles.noVendorText}>
                You have selected "No Vendor." Please proceed with Employee Details
              </p>
            </div>
          )}

              {/* Employee Details */}
              <h4 className={styles.h4}>Employee Details</h4>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="text"
                  placeholder="Employee Name"
                  className={styles.input} 
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-user"></i>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={styles.input}
                />
                <div className={styles.inputIcon}>
                  <i className="fa fa-envelope"></i>
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
                <button type="submit" className={styles.button}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
</>
  )
};