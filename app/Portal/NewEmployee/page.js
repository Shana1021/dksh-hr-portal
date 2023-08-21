"use cleint";
import "./style.css";
export default function NewEmployee() {
  return (
    <>
      <h1>New Employee</h1>
      <div className="Container">
        <input type="text" placeholder="Enter First Name" required></input>
        <input type="text" placeholder="Enter Middle Name" required></input>
        <input type="text" placeholder="Enter Last Name" required></input>
        <input
          type="text"
          placeholder="Enter Employee Password"
          required
        ></input>
        <input type="text" placeholder="Enter Position" required></input>
        <input type="text" placeholder="Enter Department" required></input>
        <input type="text" placeholder="Enter Employee ID" required></input>
        <input type="text" placeholder="Enter Address Line 1" required></input>
        <input type="text" placeholder="Enter Address Line 2" required></input>
        <input type="text" placeholder="Enter City" required></input>
        <input type="text" placeholder="Enter State" required></input>
        <input type="number" placeholder="Enter Postal Code" required></input>
        <input type="number" placeholder="Enter Phone Number" required></input>
        <input type="checkbox" id="male" name="male" value="male"></input>
        <label htmlFor="male"> Male</label>
        <input type="checkbox" id="female" name="female" value="female"></input>
        <label htmlFor="female">Female</label>
        <input type="date"></input>
      </div>
    </>
  );
}
