import Image from "next/image";

import styles from "./Card.module.css";

export const Card = () => {
  return (
    <div className={styles.flip}>
      <div className={styles.back}>
        <Image
          src="/cards/cover.png"
          height={324}
          width={250}
          alt="Card Back"
        />
      </div>
      <div className={styles.front}>
        <Image src="/cards/001.png" height={324} width={250} alt="Card Front" />
      </div>
    </div>
  );
};
