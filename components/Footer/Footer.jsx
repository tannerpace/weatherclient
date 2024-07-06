import Link from "next/link"

import styles from "./Footer.module.css"
export default function Footer() {
  const date = new Date()
  return (
    <div className={styles.footer}>
      <p>
        {/* <a href="">
          <img src="/images/instagram.svg" alt="Instagram" />
        </a> */}
        {/* <a href="">
          <img src="/images/twitter.svg" alt="Twitter" />
        </a>
        <a href="">
          <img src="/images/facebook.svg" alt="Facebook" />
        </a> */}
      </p>
      <p>
        <Link href="/terms">Terms of Service</Link> |{" "}
        <Link href="/privacy">Privacy Policy</Link>
      </p>
      <p>&copy; {date.getFullYear()} - All Rights Reserved</p>
    </div>
  )
}
