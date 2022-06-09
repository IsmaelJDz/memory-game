import { useState, useContext, FC } from "react";
import { Input } from "@/components/ui/Input";

import { MainContext } from "@/context/index";

import styles from "./Form.module.css";

interface Props {
  toggleModal: () => void;
}

export const Form: FC<Props> = ({ toggleModal }) => {
  const { setPlayerOneName, setPlayerTwoName, setPlayerTurn } =
    useContext(MainContext);

  const [playerOneNameForm, setPlayerOneNameForm] = useState<string>("");
  const [playerTwoNameForm, setPlayerTwoNameForm] = useState<string>("");

  const setNamePlayers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPlayerOneName(playerOneNameForm);
    setPlayerTwoName(playerTwoNameForm);
    setPlayerTurn(playerOneNameForm);
    toggleModal();
  };

  return (
    <div>
      <h2>Form</h2>
      <form onSubmit={setNamePlayers}>
        <span className={styles.margin}>Player One</span>
        <Input
          playerName={playerOneNameForm}
          setPlayerName={setPlayerOneNameForm}
        />
        <span className={styles.margin}>Player Two</span>
        <Input
          playerName={playerTwoNameForm}
          setPlayerName={setPlayerTwoNameForm}
        />
        <button type="submit" className={styles.formButton}>
          Agregar
        </button>
      </form>
    </div>
  );
};
