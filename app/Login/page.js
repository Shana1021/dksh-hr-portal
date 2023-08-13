"use client";

import "./login.css";
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
    <div className="login-bg">
      <div className="login-card">
        <div className="logo">
          <Image
            src="/dksh_logo.png"
            alt="DKSH Logo"
            fill
            sizes="65px"
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL="/dksh_logo.png"
          />
        </div>
        <span className="title">HR Portal</span>
        <div className="fields">
          <div className="welcome-back">Welcome back!</div>
          <div className="sign-in">Sign In</div>
          <form onSubmit={handleSubmit}>
            <div className="login-field">
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
            <div className="login-field">
              <label>
                Password
                <br />
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  required
                  minLength={5}
                  maxLength={20}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
            </div>
            <span className="error">{error}</span>
            <button type="submit" className="sign-in-btn">
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
