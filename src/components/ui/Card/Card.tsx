import { FC, useRef, useState, useContext } from "react";
import Image from "next/image";

import { MainContext } from "@/context/index";
import { toast } from "react-toastify";

import { ClassicPostLoader as SkeletonImage } from "@/components/ui/Skeleton";

import styles from "./Card.module.css";
import { CardDetail } from "@/interfaces/index";

interface Props {
  id: number;
  name: string;
  image: string;
  showCard: boolean;
  opportunities: number;
  chosenCard: CardDetail[];
  setOpportunities: (opportunities: number) => void;
  setChosenCard: React.Dispatch<React.SetStateAction<CardDetail[]>>;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Card: FC<Props> = ({
  name,
  image,
  showCard,
  id,
  opportunities,
  setOpportunities,
  chosenCard,
  setChosenCard,
  setStartGame,
}) => {
  const {
    cards,
    setCardsData,
    playerTurn,
    setPlayerPoint,
    playerOnePoints,
    playerSecondPoints,
    playerOneName,
    playerTwoName,
    setPlayerTurn,
  } = useContext(MainContext);
  const elementCard = useRef<null | HTMLDivElement>(null);
  const [isShowSkeleton, setIsShowSkeleton] = useState<boolean>(true);
  const [isImageShow, setImageShow] = useState<boolean>(false);

  const showImage = (nameCard: string) => {
    if (nameCard !== "cover") return;

    const newCards = cards.map((card) => {
      if (
        card.id === id &&
        !card.relationId &&
        opportunities < 2 &&
        id !== chosenCard[0]?.id
      ) {
        setOpportunities(opportunities + 1);
        setChosenCard([card]);
        setStartGame(true);

        if (chosenCard.length) {
          if (card.name === chosenCard[0]?.name) {
            const cardIndexChosen = cards.findIndex(
              (card) => card.id === chosenCard[0]?.id
            );

            const cardIndexCard = cards.findIndex((card) => card.id === id);

            cards[cardIndexChosen]["relationId"] = id;
            cards[cardIndexCard]["relationId"] = chosenCard[0]?.id;
            setChosenCard([]);

            playerTurn === "Player One" || playerTurn === playerOneName
              ? setPlayerPoint(playerTurn, playerOnePoints + 1)
              : setPlayerPoint(playerTurn, playerSecondPoints + 1);

            toast.success("🎉 yeah you has found one pair!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.warn("😒 cards don't match, try again next turn", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            if (playerTurn === "Player One") {
              setPlayerTurn("Player Two");
            }

            if (playerTurn === playerOneName && playerTwoName !== "") {
              setPlayerTurn(playerTwoName!);
            }

            if (playerTurn === "Player Two") {
              setPlayerTurn("Player One");
            }

            if (playerTurn === playerTwoName && playerOneName !== "") {
              setPlayerTurn(playerOneName!);
            }

            setChosenCard([]);
            setCardsData(cards);
          }
        }

        return { ...card, showCard: !showCard };
      }
      return card;
    });

    setCardsData(newCards);
  };

  const handleShowImage = () => {
    setIsShowSkeleton(false);
    setImageShow(true);
  };

  return (
    <>
      <div className={styles.card} ref={elementCard}>
        <div
          className={
            showCard
              ? styles.card__inner + " " + styles.is_flipped + " " + name
              : styles.card__inner
          }
        >
          <div
            className={
              styles.card__face +
              " " +
              styles.card__face_front +
              " " +
              styles.card_item
            }
          >
            {isShowSkeleton && (
              <SkeletonImage
                peed={2}
                width={240}
                height={324}
                viewBox="0 10 100 150"
                backgroundColor="#ffffff"
                foregroundColor="#dcdcdc"
                style={{ width: "100%" }}
              />
            )}
            <Image
              onClick={() => showImage("cover")}
              src="/cards/cover.png"
              height={242}
              layout="fill"
              width={200}
              alt="Card Back"
              priority={true}
              loading="eager"
              onLoadingComplete={() => handleShowImage()}
            />
          </div>
          <div className={styles.card__face + " " + styles.card__face_back}>
            <div className="card__content">
              <Image
                onClick={() => showImage(name)}
                src={`/cards/${image}`}
                height={242}
                layout="fill"
                width={200}
                alt="Card Front"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
