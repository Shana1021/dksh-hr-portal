"use client";
import React, { useState } from "react";
import "./req.module.css";

export default function TrainingRequestTraining() {
   // To store the vendor code
   const [vendorCode, setVendorCode] = useState('');

   // Function to handle changes in the input field
   const handleVendorCodeChange = (event) => {
    setVendorCode(event.target.value);

    const handleClick = () => {
      alert('Button clicked!');
    }
  }

  return (
    <>
    <div className="Container">
      <label>Course Title
        <input type="text" placeholder="Enter Course Title" required />
        </label>
        <label>Vendor Name
          <input type="text" placeholder="Enter Vendor Name" required />
          </label>
          <label>Address Line 1
            <input type="text" placeholder="Enter Address Line 1" required />
            </label>
            <label>Address Line 2
              <input type="text" placeholder="Enter Address Line 2" required />
              </label>
              <label>Employee Name
                <input type="text" placeholder="Enter Employee Name" required />
                </label>
                <label>Employee Email
                  <input type="email" placeholder="Enter Employee Email" required />
                  </label>

      <div className="Location">
        <div className="LocationGroup">
          <label>Country</label>
          <input type="text" placeholder="Enter Country" required />
          </div>
          <div className="LocationGroup">
            <label>City</label>
            <input type="text" placeholder="Enter City" required />
          </div>
          </div>

          <div className="Location">
            <div className="LocationGroup">
              <label>Region</label>
              <input type="text" placeholder="Enter Region" required />
              </div>
              <div className="LocationGroup">
                <label>Postal Code</label>
                <input type="text" placeholder="Enter Postal Code" required />
                </div>
           </div>

           <div className="Course">
             <div className="input-group">
               <label>Course Date</label>
               <input type="date" placeholder="Enter Course Date" required />
               </div>
               <div className="input-group">
                 <label>Course Time</label>
                 <input type="time" placeholder="Enter Course Time" required />
                 </div>
             </div>

            <div className="Course">
              <div className="input-group">
                <label>Total Hours</label>
                <input type="time" placeholder="Enter Total Hours" required />
                </div>
                <div className="input-group">
                  <label>Course Fee</label>
                  <input type="text" placeholder="Enter Course Fee" required />
                  </div>
             </div>
  
             <div className="radio">
              <label htmlFor="vendor" className=" bigger-label">
                {"Existing Vendor"}     
                </label>
                <input type="radio" id="vendor" name="vendor" value="existing vendor" />
                <label htmlFor="vendor" className=" bigger-label">
                  {"New Vendor"}     
                  </label>
                  <input type="radio" id="vendor" name="vendor" value="new vendor" />
                  <label htmlFor="vendor" className=" bigger-label">
                    {"No Vendor"}     
                    </label>
                    <input type="radio" id="vendor" name="vendor" value="no vendor" />
                    </div>
    </div>
        
        <label>Please Download Vendor file below</label>
        {/* This is for testing purpose */}
        <a href="file:///C:/Users/User/Desktop/TimeTable.pdf" download="TimeTable.pdf"  className="btn">
        <i className="fa fa-download"></i> Download me</a>

        <div className="Button">
          <input type="submit" value="SUBMIT" className="bigger-button" />
          </div>
     </>
  )
};