/* training */
"use client";
import React, { useState } from "react";
import "./style.css";

export default function TrainingStatusCheck() {
  const [data, setData] = useState([
    // table data goes here
    {
      No: 1001,
      Name: "John Doe",
      ID: "12345",
      InCharge: "Manager",
      Department: "HR",
      TrainingVendor: "",
      EmailStatus: "",
    },
  ]);

  const [filters, setFilters] = useState({
    // filter criteria goes here
    TrainingVendor: [],
    EmailStatus: [],
  });

  return (
    <>
      <div className="container-search-button">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Filter by Status"
            className="filter-input"
          />
          <span className="search-icon">&#128269;</span>
        </div>
      </div>

      {/* Table */}
      <table className="training-status-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>ID</th>
            <th>In-Charge</th>
            <th>Department</th>
            <th>Training Vendor</th>
            <th>Email Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.No}</td>
              <td>{row.Name}</td>
              <td>{row.ID}</td>
              <td>{row.InCharge}</td>
              <td>{row.Department}</td>
              <td>
                {/*checkboxes for Training Vendor */}
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name={`TrainingVendorOption1_${index}`}
                      value="Option1"
                      checked={filters.TrainingVendor.includes("Option1")}
                      onChange={(e) =>
                        handleFilterChange(e, "TrainingVendor")
                      }
                    />
                    Existing Vendor
                  </label>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name={`TrainingVendorOption2_${index}`}
                      value="Option2"
                      checked={filters.TrainingVendor.includes("Option2")}
                      onChange={(e) =>
                        handleFilterChange(e, "TrainingVendor")
                      }
                    />
                    New Vendor
                  </label>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name={`TrainingVendorOption3_${index}`}
                      value="Option3"
                      checked={filters.TrainingVendor.includes("Option3")}
                      onChange={(e) =>
                        handleFilterChange(e, "TrainingVendor")
                      }
                    />
                    No Vendor
                  </label>
                </div>
              </td>
              <td>
                {/* checkboxes for Email Status */}
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name={`EmailStatusComplete_${index}`}
                      value="Complete"
                      checked={filters.EmailStatus.includes("Complete")}
                      onChange={(e) => handleFilterChange(e, "EmailStatus")}
                    />
                    Complete
                  </label>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name={`EmailStatusIncomplete_${index}`}
                      value="Incomplete"
                      checked={filters.EmailStatus.includes("Incomplete")}
                      onChange={(e) => handleFilterChange(e, "EmailStatus")}
                    />
                    Pending 
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="module-button refresh-button">REFRESH</button>
        <button className="module-button refresh-button">SEND EMAIL</button>
      </div>
    </>
  );
}