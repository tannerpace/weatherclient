import React from "react"

import styles from "./style.module.css"
export default function Input({ as = "input", ...rest }) {
  return (
    <div className={styles.inputShell}>
      {React.createElement(as, { className: styles.input, ...rest })}
    </div>
  )
}
