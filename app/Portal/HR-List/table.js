"use client";
import "./style.css";
import { FaPenToSquare } from "react-icons/fa6";
export default function Table() {
  return (
    <table>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Position</th>
        <th>Action</th>
      </tr>
      <tr>
        <td>Peter</td>
        <td>Griffin</td>
        <td>$100</td>
        <td></td>
      </tr>
      <tr>
        <td>Lois</td>
        <td>Griffin</td>
        <td>$150</td>
        <td>fdjsd</td>
      </tr>
      <tr>
        <td>Joe</td>
        <td>Swanson</td>
        <td>$300</td>
        <td>fdjsd</td>
      </tr>
      <tr>
        <td>Cleveland</td>
        <td>Brown</td>
        <td>$250</td>
        <td>fdjsd</td>
      </tr>
    </table>
  );
}
