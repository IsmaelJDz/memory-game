import { MainState } from "./";
import { CardDetail } from "@/interfaces/index";

type MainActionType =
  | { type: "Data - Set Cards"; payload: CardDetail[] }
  | { type: "Turn - Set PlayerOne Point"; payload: number }
  | { type: "Turn - Set PlayerSecond Point"; payload: number }
  | { type: "Turn - Set PlayerTurn"; payload: string }
  | { type: "Turn - Set PlayerOneName Turn"; payload: string }
  | { type: "Turn - Set PlayerTwoName Turn"; payload: string };

export const mainReducer = (
  state: MainState,
  action: MainActionType
): MainState => {
  switch (action.type) {
    case "Data - Set Cards":
      return {
        ...state,
        cards: [...action.payload],
      };

    case "Turn - Set PlayerTurn":
      return {
        ...state,
        playerTurn: action.payload,
      };

    case "Turn - Set PlayerOne Point":
      return {
        ...state,
        playerOnePoints: action.payload,
      };

    case "Turn - Set PlayerSecond Point":
      return {
        ...state,
        playerSecondPoints: action.payload,
      };

    case "Turn - Set PlayerOneName Turn":
      return {
        ...state,
        playerOneName: action.payload,
      };

    case "Turn - Set PlayerTwoName Turn":
      return {
        ...state,
        playerTwoName: action.payload,
      };

    default:
      return state;
  }
};
