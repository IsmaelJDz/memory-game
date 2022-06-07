import type { NextPage } from "next";
import { Layout } from "@/components/layouts";
import { Card } from "@/components/ui/Card";

import { CardDetail } from "@/interfaces/index";

interface Props {
  cards: CardDetail[];
}

export const Board: NextPage<Props> = ({ cards }) => {
  console.log("cards", cards);

  return (
    <Layout title="Home - OpenJira">
      <div>
        <Card />
      </div>
    </Layout>
  );
};
