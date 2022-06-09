import { FC, useReducer } from "react";
import { MainContext } from "./";
import { mainReducer } from "./MainReducer";

import { CardDetail } from "@/interfaces/index";

export interface MainState {
  cards: CardDetail[];
  playerTurn: string;
  playerOnePoints: number;
  playerOneName: string;
  playerTwoName: string;
  playerSecondPoints: number;
}

interface MainProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const UI_INITIAL_STATE: MainState = {
  cards: [],
  playerTurn: "Player One",
  playerOnePoints: 0,
  playerSecondPoints: 0,
  playerOneName: "",
  playerTwoName: "",
};

export const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, UI_INITIAL_STATE);

  const setCardsData = (cards: CardDetail[]) => {
    dispatch({ type: "Data - Set Cards", payload: cards });
  };

  const setPlayerPoint = (player: string, point: number) => {
    if (player === "Player One" || player === state.playerOneName) {
      dispatch({ type: "Turn - Set PlayerOne Point", payload: point });
    }

    if (player === "Player Two" || player === state.playerTwoName) {
      dispatch({ type: "Turn - Set PlayerSecond Point", payload: point });
    }
  };

  const setPlayerTurn = (playerTurn: string) => {
    dispatch({ type: "Turn - Set PlayerTurn", payload: playerTurn });
  };

  const setPlayerOneName = (playerOneName: string) => {
    dispatch({ type: "Turn - Set PlayerOneName Turn", payload: playerOneName });
  };

  const setPlayerTwoName = (playerTwoName: string) => {
    dispatch({ type: "Turn - Set PlayerTwoName Turn", payload: playerTwoName });
  };

  return (
    <MainContext.Provider
      value={{
        ...state,
        setCardsData,
        setPlayerPoint,
        setPlayerTurn,
        setPlayerOneName,
        setPlayerTwoName,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
