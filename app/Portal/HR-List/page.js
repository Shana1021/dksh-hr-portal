import "./main.css";
import Table from "./table";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
export default function HRPage() {
  return (
    <>
      <h1>Header</h1>
      <div className="Table">
        <div className="Search">
          <input type="search" placeholder="Search..."></input>
          <FaSearch className="icon" />
        </div>
        <Table className="test" />
        <div className="button">
          <Link href="./NewEmployee">
            <button>Add Employee</button>
          </Link>
        </div>
      </div>
    </>
  );
}
