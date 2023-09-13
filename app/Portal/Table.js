"use client";

import Link from "next/link";
import styles from "./table.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Table({ columns, data, height="auto", totalRows=0 }) {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSize = parseInt(searchParams.get("pageSize") ?? 25);
  const page = parseInt(searchParams.get("page") ?? 1);

  const [goPage, setGoPage] = useState(null);

  useEffect(() => setGoPage(page), [page]);

  const totalPages = Math.ceil(totalRows / pageSize);

  return (
    <div>
      <div className={styles["table-container"]} style={{height}}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(d => {
              let row = [];
              for (const column of columns) {
                row.push(<td key={column.key}>{d[column.key]}</td>);
              }

              return <tr key={d._id}>{row}</tr>;
            })}
          </tbody>
        </table>
      </div>
      <div className={styles["table-footer"]}>
        Showing {1 + (page - 1) * pageSize} - {Math.min(totalRows, page * pageSize)},{" "}
        <select
          onChange={e =>
            router.push(`${pathname}?${new URLSearchParams([["pageSize", e.target.value], ["page", page]])}`)
          }
        >
          <option name="25">25</option>
          <option name="50">50</option>
          <option name="100">100</option>
          <option name="200">200</option>
        </select>
        {" "}per page
        <div className={styles["table-footer-right"]}>
          <Link href={{ query: { pageSize, page: 1 } }}>First</Link>
          <Link href={{ query: { pageSize, page: Math.max(1, page - 1) } }}>Previous</Link>
          Page {page} of {totalPages}
          <Link href={{ query: { pageSize, page: Math.min(totalPages, page + 1) } }}>Next</Link>
          <Link href={{ query: { pageSize, page: totalPages} }}>Last</Link>
          <input
            type="number"
            style={{ width: 40 }}
            value={goPage}
            min="1"
            max={pageSize}
            onChange={e => setGoPage(e.target.value)}
          />
          <button
            onClick={() => {
              if (!/^\d+$/.test(goPage) || goPage < 1 || goPage > totalPages) {
                return;
              }

              router.push(`${pathname}?${new URLSearchParams([["pageSize", pageSize], ["page", goPage]])}`)
            }}
          >Go</button>
        </div>
      </div>
    </div>
  );
};