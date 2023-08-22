"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./style.css";
export default function Settings() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_nv2oyxh",
        "template_tngp1gi",
        form.current,
        "tpigrMza7AfM77Mds"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <h2>System Email Settings</h2>
      <div className="Container">
        <form ref={form} onSubmit={sendEmail}>
          <label className="label">Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
      <h2>Recepient Email Settings</h2>
      <div className="Container">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}
