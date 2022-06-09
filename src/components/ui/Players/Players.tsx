import { FC } from "react";
import styles from "./Players.module.css";

interface Props {
  randomColorOne: string;
  randomColorTwo: string;
  playerOneName: string | undefined;
  playerTwoName: string | undefined;
  playerOnePoints: number;
  playerSecondPoints: number;
}

export const Players: FC<Props> = ({
  randomColorOne,
  randomColorTwo,
  playerOneName,
  playerTwoName,
  playerOnePoints,
  playerSecondPoints,
}) => {
  return (
    <div className={styles.players}>
      <div
        className={styles.playerOne}
        style={{ backgroundColor: randomColorOne }}
      >
        <p>Player name: {playerOneName ? playerOneName : "Player One"}</p>
        <p className={styles.points}> {playerOnePoints}</p>
      </div>
      <div
        className={styles.playerSecond}
        style={{ backgroundColor: randomColorTwo }}
      >
        <p>Player name: {playerTwoName ? playerTwoName : "Player Two"}</p>
        <p className={styles.points}>{playerSecondPoints}</p>
      </div>
    </div>
  );
};
