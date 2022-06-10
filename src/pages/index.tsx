import { useContext, useLayoutEffect } from "react";
import { GetStaticProps } from "next";
import { Board } from "@/components/ui/Board";

import getData from "@/utils/common";
import { initialData } from "@/data/data";

import { CardDetail } from "@/interfaces/index";
import { MainContext } from "@/context/index";

/**
 *
 * @param {*} props gets data from api, server to client SSR
 * @returns Component -> Principal
 */

interface Props {
  cards: CardDetail[];
}

export default function Home({ cards }: Props) {
  const { setCardsData } = useContext(MainContext);

  useLayoutEffect(() => {
    setCardsData(cards);
  }, []);

  return <Board />;
}

export const getStaticProps: GetStaticProps = async () => {
  /*  if data comes from some api */

  // const data = await getData(
  //   "https://products-api-meru.vercel.app/api/products"
  // ).catch((err) => {
  //   console.error(err);
  // });

  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: "/no-data",
  //     },
  //   };
  // }

  // if (data.length === 0) {
  //   return { notFound: true };
  // }

  return {
    props: {
      //products: data,
      cards: initialData,
    },
  };
};
