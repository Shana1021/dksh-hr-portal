import React from "react";
import { BiEdit } from "react-icons/bi"; //Edit
import { FiTrash } from "react-icons/fi"; //Delete

export default function Table() {
  return (
    <div className="fixedTable">
      <table className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>ID</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 25 }).map((_, index) => (
            <tr key={index}>
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 4</td>
              <td>
                <button className="edit-button">
                  <BiEdit className="icon" />
                </button>
                <button className="delete-button">
                  <FiTrash className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
