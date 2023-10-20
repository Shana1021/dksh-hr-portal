"use client";

import Link from "next/link";
import styles from "./table.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Table({
  columns,
  data,
  height = "auto",
  totalRows = 0,
}) {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSize = parseInt(searchParams.get("pageSize") ?? 25);
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const page = Math.min(totalPages, parseInt(searchParams.get("page") ?? 1));

  const [goPage, setGoPage] = useState("");

  useEffect(() => setGoPage(page), [page]);

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-scroll-container"]} style={{ height }}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d._id}>
                  {columns.map(column => (
                    <td key={column.key}>{d[column.key]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles["table-footer"]}>
        Page {page} of {totalPages} | Showing{" "}
        {totalRows == 0 ? 0 : 1 + (page - 1) * pageSize} -{" "}
        {Math.min(totalRows, page * pageSize)},{" "}
        <select
          onChange={(e) =>
            router.push(
              `${pathname}?${new URLSearchParams([
                ["pageSize", e.target.value],
                ["page", 1],
              ])}`
            )
          }
        >
          <option name="25">25</option>
          <option name="50">50</option>
          <option name="100">100</option>
          <option name="200">200</option>
        </select>{" "}
        per page
        <div className={styles["table-footer-right"]}>
          <div className={styles["pre-search"]}>
            <button className={styles["pagination-btn"]}>
              <Link href={{ query: { pageSize, page: 1 } }}>First</Link>
            </button>
            <button className={styles["pagination-btn"]}>
              <Link href={{ query: { pageSize, page: Math.max(1, page - 1) } }}>
                /Previous
              </Link>
            </button>
          </div>

          <input
            type="number"
            style={{ width: 40 }}
            value={goPage}
            min="1"
            max={totalPages}
            onChange={(e) => setGoPage(e.target.value)}
          />
          <button
            className={styles["Go-btn"]}
            onClick={() => {
              if (!/^\d+$/.test(goPage) || goPage < 1 || goPage > totalPages) {
                return;
              }

              router.push(
                `${pathname}?${new URLSearchParams([
                  ["pageSize", pageSize],
                  ["page", goPage],
                ])}`
              );
            }}
          >
            Go
          </button>
          <div className={styles["after-search"]}>
            <button className={styles["pagination-btn"]}>
              <Link
                href={{
                  query: { pageSize, page: Math.min(totalPages, page + 1) },
                }}
              >
                Next
              </Link>
            </button>
            <button className={styles["pagination-btn"]}>
              <Link href={{ query: { pageSize, page: totalPages } }}>
                /Last
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
