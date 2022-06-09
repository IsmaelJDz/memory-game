import { FC } from "react";
import styles from "./TextAnimated.module.css";

interface Props {
  winner: string;
}

export const TextAnimated: FC<Props> = ({ winner }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bg_7}>
        <h1></h1>
        <h2>{winner} won the game</h2>
      </div>
    </div>
  );
};
