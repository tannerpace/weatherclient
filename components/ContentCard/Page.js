import styles from "./styles.module.css"


export default function ContentCard({ title, content }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {title}
        </h1>
        <p className={styles.description}>
          {content}
        </p>
      </main >
    </div >
  )
}

