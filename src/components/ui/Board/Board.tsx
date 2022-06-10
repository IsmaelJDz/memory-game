import { useState, useContext, useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "@/components/layouts";
import { Card } from "@/components/ui/Card";
import { MainContext } from "@/context/index";
import { TextAnimated } from "@/components/ui/Text";

import styles from "./Board.module.css";
import { CardDetail } from "@/interfaces/card-detail";

import confetti from "canvas-confetti";
import { toast } from "react-toastify";

import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";
import { Form } from "@/components/ui/Form";
import { Players } from "@/components/ui/Players";
import { Actions } from "@/components/ui/Actions";

export const Board: NextPage = () => {
  const {
    cards: originalCards,
    setCardsData,
    playerTurn,
    playerOnePoints,
    playerSecondPoints,
    setPlayerPoint,
    playerOneName,
    playerTwoName,
  } = useContext(MainContext);
  const {
    show: showModal,
    toggle: toggleModal,
    close: closeModal,
  } = useModal();
  const [opportunities, setOpportunities] = useState<number>(0);
  const [chosenCard, setChosenCard] = useState<CardDetail[]>([]);
  const [randomColorOne, setRandomColorOne] = useState("aquamarine");
  const [randomColorTwo, setRandomColorTwo] = useState("blueviolet");
  const [winner, setWinner] = useState<string>("");
  const [startGame, setStartGame] = useState(false);
  let end = Date.now() + 15 * 1000;

  const setRandomCards = () => {
    let randomColorOne = Math.floor(Math.random() * 16777215).toString(16);
    let randomColorTwo = Math.floor(Math.random() * 16777215).toString(16);

    setRandomColorOne(`#${randomColorOne}`);
    setRandomColorTwo(`#${randomColorTwo}`);

    const randomElement = (originalCards: CardDetail[]) =>
      originalCards.sort(() => 0.5 - Math.random());
    const RandomCards = randomElement(originalCards);
    setCardsData(RandomCards);
    toast("🎰 Cards have been placed randomly!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const setPlayAgain = () => {
    setRandomCards();
    const playAgain = originalCards.map((card) => {
      return { ...card, showCard: false, relationId: null };
    });
    setCardsData(playAgain);
    setPlayerPoint("Player One", 0);
    setPlayerPoint("Player Two", 0);
    setWinner("");
    setStartGame(false);
  };

  useEffect(() => {
    if (opportunities === 2) {
      const newResponse = originalCards.map((card) => {
        if (!card.relationId) {
          return { ...card, showCard: false };
        }
        return card;
      });

      setTimeout(() => {
        setCardsData(newResponse);
        setOpportunities(0);
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunities]);

  useEffect(() => {
    const allCardsMatched = originalCards.filter(
      (card) => card.showCard !== true
    );

    if (
      (allCardsMatched.length === 0 && playerOnePoints > 0) ||
      (allCardsMatched.length === 0 && playerSecondPoints > 0)
    ) {
      if (playerOnePoints > playerSecondPoints) {
        setWinner(playerOneName || "Player One");
      }

      if (playerSecondPoints > playerOnePoints) {
        setWinner(playerTwoName || "Player Two");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalCards, playerOnePoints, playerSecondPoints]);

  useEffect(() => {
    if (winner !== "") {
      toast.success(`🎉 ${winner} has won the game!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: [
            "#f44336",
            "#e91e63",
            "#673ab7",
            "#2196f3",
            "#8bc34a",
            "#ffeb3b",
          ],
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: [
            "#f44336",
            "#e91e63",
            "#673ab7",
            "#2196f3",
            "#8bc34a",
            "#ffeb3b",
          ],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  const choseName = () => {
    toggleModal();
  };

  return (
    <Layout title="Home - Memory Game">
      <Modal size="md" show={showModal} onClose={closeModal}>
        <h3 className={styles.titleModal}>Do you want to choose names?</h3>
        <Form toggleModal={toggleModal} />
      </Modal>

      <div style={{ marginTop: 100 }}>
        {winner !== "" && (
          <>
            <p className={styles.trophy}>🏆</p>
            <TextAnimated winner={winner} />
          </>
        )}
      </div>

      <Actions
        setRandomCards={setRandomCards}
        setPlayAgain={setPlayAgain}
        choseName={choseName}
        startGame={startGame}
        winner={winner}
      />

      {/* <h1> opportunities: {opportunities} </h1> */}
      <div className={styles.wrapper}>
        {originalCards.map((card) => (
          <Card
            setOpportunities={setOpportunities}
            opportunities={opportunities}
            setChosenCard={setChosenCard}
            setStartGame={setStartGame}
            chosenCard={chosenCard}
            key={card.id}
            {...card}
          />
        ))}
      </div>
      <h1 className={styles.playerTurn}> Player Turn: {playerTurn} </h1>

      <Players
        randomColorOne={randomColorOne}
        randomColorTwo={randomColorTwo}
        playerOneName={playerOneName}
        playerTwoName={playerTwoName}
        playerOnePoints={playerOnePoints}
        playerSecondPoints={playerSecondPoints}
      />
    </Layout>
  );
};
