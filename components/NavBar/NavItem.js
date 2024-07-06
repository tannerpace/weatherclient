'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./style.module.css";
const NavItem = ({ text, href, active }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}
      className={isActive ? styles.active : styles.inactive}
    >
      {text}
    </Link>
  );
};

export default NavItem;