import { FC } from "react";
import styles from "./Actions.module.css";

interface Props {
  setRandomCards: () => void;
  setPlayAgain: () => void;
  choseName: () => void;
  startGame: boolean;
  winner: string;
}

export const Actions: FC<Props> = ({
  setRandomCards,
  setPlayAgain,
  choseName,
  startGame,
  winner,
}) => {
  return (
    <div className={styles.wrapperBtn}>
      <button className={styles.space + " " + "btn"} onClick={choseName}>
        đŠđŧâđ¤âđ¨đģ Chose names!
      </button>
      <button className="btn" onClick={setPlayAgain}>
        {winner !== "" && "âŠī¸ Play Again"}
        {winner === "" && !startGame && "đŽ Play Now"}
        {winner === "" && startGame && <span>đ° Restart Game</span>}
      </button>
      <button
        disabled={startGame}
        className={styles.space + " " + "btn"}
        style={
          startGame ? { backgroundColor: "#ccc", cursor: "not-allowed" } : {}
        }
        onClick={setRandomCards}
      >
        đ° Random Cards!
      </button>
    </div>
  );
};
