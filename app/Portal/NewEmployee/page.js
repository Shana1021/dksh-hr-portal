"use client";
import React, { useState } from "react";
import "./style.css";

export default function NewEmployee() {
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
  return (
    <>
      <div className="Container">
        <input type="text" placeholder="Enter First Name" required />
        <input type="email" placeholder="Enter Employee Email" required />
        <input type="text" placeholder="Enter Middle Name" required />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter Employee Password"
          required
        />
        <input type="text" placeholder="Enter Last Name" required />
        <label>
          Show Password
          <input type="checkbox" onClick={togglePasswordVisibility} />
        </label>

        <input type="text" placeholder="Enter Employee ID" required />
        <label htmlFor="male" className="bigger-label">
          Gender
        </label>
        <br />
        <div className="radio">
          <label htmlFor="male" className=" bigger-label">
            {" "}
            Male
          </label>
          <input type="radio" id="male" name="malefemale" value="male" />
          <label htmlFor="female" className="bigger-label">
            Female
          </label>
          <input type="radio" id="female" name="malefemale" value="female" />
        </div>

        <input type="text" placeholder="Enter Address Line 1" required />

        <input type="date" required />

        <input type="text" placeholder="Enter Address Line 2" required />
        <div className="city-state-container">
          <input type="text" placeholder="Enter City" required />
          <input type="text" placeholder="Enter State" required />
        </div>

        <div className="image-upload">
          <label htmlFor="image">Upload Image: </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* We don't need to display an image */}
          {/* {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Employee Image"
              className="uploaded-image"
            />
          )} */}
        </div>

        <div className="postal-phone-container">
          <input type="text" placeholder="Enter Postal Code" required />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            pattern={"[0-9]{2}-[0-9]{3}-[0-9]{4}"}
            required
          />
        </div>
      </div>

      <div className="Button">
        <input type="submit" value="Submit" className="bigger-button" />
      </div>
    </>
  );
}
