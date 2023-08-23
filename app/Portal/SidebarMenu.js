import styles from "./sidebar.module.css";
import Link from "next/link";

export default function SidebarMenu({ item }) {
  return (
    <div className={styles["sidebar-menu"]}>
      <div className={styles["sidebar-title"]}>
        <Link href={item.path}>
          <span className={styles["sidebar-menu-icon"]}>{item.icon}</span>
          {item.title}
        </Link>
      </div>
    </div>
  );
}
