import Link from "next/link"

import styles from "./styles.module.css"
export default function LinkCard({
  href,
  label,
  description,
  icon,
  icon2 = null,
}) {
  return (
    <Link href={href} icon={icon} className={styles.LinkCard}>
      <span>
        <h3>
          {label}
          <br />
          {icon}
        </h3>
        <p>{description}</p>
      </span>
      {/* <p>{icon}</p> */}
    </Link>
  )
}
