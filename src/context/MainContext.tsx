import { createContext } from "react";
import { CardDetail } from "@/interfaces/index";

interface ContextProps {
  cards: CardDetail[];
  playerTurn: string;
  playerOnePoints: number;
  playerSecondPoints: number;
  playerOneName?: string;
  playerTwoName?: string;
  setCardsData: (cards: CardDetail[]) => void;
  setPlayerPoint: (player: string, point: number) => void;
  setPlayerTurn: (playerTurn: string) => void;
  setPlayerOneName: (playerOneName: string) => void;
  setPlayerTwoName: (playerTwoName: string) => void;
}

export const MainContext = createContext({} as ContextProps);
