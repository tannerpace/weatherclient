import React from "react"
import styles from "./Button.module.css"

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
