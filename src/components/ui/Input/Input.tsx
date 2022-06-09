import React, { FC } from "react";

import styles from "./Input.module.css";

interface Props {
  playerName: string;
  setPlayerName: (name: string) => void;
}

export const Input: FC<Props> = ({ playerName, setPlayerName }) => {
  return (
    <input
      name="name"
      type="text"
      id="form-name"
      value={playerName}
      className={styles.Input}
      placeholder="Player name"
      onChange={(evt) => setPlayerName(evt.target.value)}
    />
  );
};
