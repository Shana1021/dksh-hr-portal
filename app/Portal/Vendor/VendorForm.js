"use client";

import { FaIdCard, FaUserTie } from "react-icons/fa";
import styles from "./vendor.module.css";
import { IoMdMail } from "react-icons/io";
import { BiSolidPhone } from "react-icons/bi";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorForm({ vendor }) {
  const router = useRouter();
  const vendorCodeRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitted) {
      return;
    }
    setSubmitted(true);

    const res = await fetch(vendor ? `/api/vendor/${encodeURIComponent(vendor._id)}` : "/api/vendor", {
      method: vendor ? "PUT" : "POST",
      body: new FormData(e.target)
    });
    if (!res.ok) {
      setSubmitted(false);
      alert(res.statusText);
      return;
    }

    const data = await res.json();

    if (data.status === "vendorCodeAlreadyExists") {
      setSubmitted(false);
      vendorCodeRef.current.setCustomValidity("Vendor Code already exists.");
      vendorCodeRef.current.reportValidity();
      return;
    }

    router.push("/Portal/Training-VendorList");
    router.refresh();
  }

  return (
    <form className={styles["formBody"]} onSubmit={handleSubmit}>
      <div className={styles["formWrapper"]}>
        <div className={styles["form"]}>
          <div className={styles.row}>
            <h4 className={styles["h4"]}>Vendor Details</h4>
            <div
              className={`${styles["inputGroup"]} ${styles["inputGroupIcon"]}`}
            >
              <input
                ref={vendorCodeRef}
                type="text"
                name="_id"
                placeholder="Vendor Code"
                required
                onChange={e => {
                  e.target.setCustomValidity("");
                  e.target.reportValidity();
                }}
                defaultValue={vendor?._id}
                readOnly={!!vendor}
                className={styles["input"]}
              />
              <div className={styles["inputIcon"]}>
                <FaIdCard />
              </div>
            </div>
            <div
              className={`${styles["inputGroup"]} ${styles["inputGroupIcon"]}`}
            >
              <input
                type="text"
                name="name"
                placeholder="Vendor Name"
                defaultValue={vendor?.name}
                className={styles["input"]}
              />
              <div className={styles["inputIcon"]}>
                <FaUserTie />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles["colHalf"]}>
                <div
                  className={`${styles["inputGroup"]} ${styles["inputGroupIcon"]}`}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    defaultValue={vendor?.email}
                    className={styles["input"]}
                  />
                  <div className={styles["inputIcon"]}>
                    <IoMdMail />
                  </div>
                </div>
              </div>
              <div className={styles["colHalf"]}>
                <div
                  className={`${styles["inputGroup"]} ${styles["inputGroupIcon"]}`}
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    defaultValue={vendor?.phone}
                    className={styles["input"]}
                  />
                  <div className={styles["inputIcon"]}>
                    <BiSolidPhone />
                  </div>
                </div>
              </div>
            </div>
          </div>

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