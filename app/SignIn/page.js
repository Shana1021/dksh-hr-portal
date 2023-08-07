"use client";

import SignInField from "./SignInField";
import "./sign_in.css";
import Image from "next/image";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sign-in-bg">
      <div className="sign-in-card">
        <div className="logo">
          <Image src="/dksh_logo.png" alt="DKSH Logo" layout="fill" objectFit="contain" />
        </div>
        <span className="title">HR Portal</span>
        <div className="fields">
          <div className="welcome-back">Welcome back</div>
          <div className="sign-in">Sign In</div>
          <SignInField
            type="email"
            name="Email"
            value={email}
            placeholder="example@email.com"
            onChange={e => setEmail(e.target.value)}
          />
          <SignInField
            type="password"
            name="Password"
            value={password}
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="sign-in-btn">SIGN IN</button>
        </div>
      </div>
    </div>
  );
}