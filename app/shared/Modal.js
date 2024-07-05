import Image from "next/image";

import styles from "./Modal.module.css";

export default function Modal({ photo, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h1>{photo.title}</h1>
        <Image src={photo.url} alt={photo.title} width={800} height={600} />
      </div>
    </div>
  );
}
