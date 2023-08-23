"use client";

import styles from "./login.module.css";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { callbackUrl } = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError("*Invalid email or password.");
      return;
    }

    router.push(callbackUrl || "/Portal/Dashboard");
  }

  return (
    <div className={styles["login-bg"]}>
      <div className={styles["login-card"]}>
        <div className={styles["logo"]}>
          <Image
            src="/dksh_logo.png"
            alt="DKSH Logo"
            fill
            sizes="65px"
            unoptimized
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <span className={styles["title"]}>HR Portal</span>
        <div className={styles["fields"]}>
          <div className={styles["welcome-back"]}>Welcome back!</div>
          <div className={styles["sign-in"]}>Sign In</div>
          <form onSubmit={handleSubmit}>
            <div className={styles["login-field"]}>
              <label>
                Email
                <br />
                <input
                  type="email"
                  value={email}
                  placeholder="example@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br />
            </div>
            <div className={styles["login-field"]}>
              <label>
                Password
                <br />
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  required
                  minLength={5}
                  maxLength={20}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className={styles["show-password"]}>
              <label>
                <input type="checkbox" onClick={togglePasswordVisibility} />
                Show Password
              </label>
            </div>
            <span className={styles["error"]}>{error}</span>
            <button type="submit" className={styles["sign-in-btn"]}>
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
