"use client";
import React, { useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { Router } from "react-router-dom";

export default function NewEmployee() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  //const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");
  const [number, setNumber] = useState("");
  // const onOptionChange = (e) => {
  //   setGender(e.target.value);
  // };
  // empId, address1, address2, email, gender, dob, city, state, code, number
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fname || !mname || !lname) {
      alert("Fill up all columns");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/HRStaff", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fname,
          mname,
          lname,
          empId,
          password,
          address1,
          address2,
          email,
          gender,
          dob,
          city,
          state,
          code,
          number,
        }),
      });
      if (res.ok) {
        router.push("/Portal/HR-List");
      } else {
        throw new Error("Failed");
      }
    } catch (error) {}
  }; //For form to prevent empty submissions
  return (
    <>
      <div className="Container">
        <input
          type="text"
          placeholder="Enter First Name"
          required
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Employee Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Middle Name"
          required
          onChange={(e) => setMname(e.target.value)}
        />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter Employee Password"
          required
          onChange={(e) => setPassword(e.target.value.bscrypt)}
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          required
          onChange={(e) => setLname(e.target.value)}
        />
        <label>
          Show Password
          <input type="checkbox" onClick={togglePasswordVisibility} />
        </label>

        <input
          type="text"
          placeholder="Enter Employee ID"
          required
          onChange={(e) => setEmpId(e.target.value)}
        />
        <label htmlFor="male" className="bigger-label">
          Gender
        </label>
        <br />
        <div className="radio">
          <label htmlFor="male" className=" bigger-label">
            {" "}
            Male
          </label>
          <input
            type="radio"
            id="male"
            name="malefemale"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="female" className="bigger-label">
            Female
          </label>
          <input
            type="radio"
            id="female"
            name="malefemale"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Enter Address Line 1"
          required
          onChange={(e) => setAddress1(e.target.value)}
        />

        <input type="date" required onChange={(e) => setDOB(e.target.value)} />

        <input
          type="text"
          placeholder="Enter Address Line 2"
          required
          onChange={(e) => setAddress2(e.target.value)}
        />
        <div className="city-state-container">
          <input
            type="text"
            placeholder="Enter City"
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter State"
            required
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        {/* <div className="image-upload">
          <label htmlFor="image">Upload Image: </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
         
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Employee Image"
              className="uploaded-image"
            />
          )}
        </div> */}

        <div className="postal-phone-container">
          <input
            type="text"
            placeholder="Enter Postal Code"
            required
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            pattern={"[0-9]{2}-[0-9]{3}-[0-9]{4}"}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="Button">
        <input
          type="submit"
          value="Submit"
          className="bigger-button"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
