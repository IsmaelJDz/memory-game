import Head from "next/head";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

interface Props {
  title?: string;
  children: React.ReactNode[] | React.ReactNode;
}

export const Layout = ({ title = "Memory Game", children }: Props) => {
  return (
    <div>
      <Head>
        <title> {title} </title>
      </Head>

      <Navbar />

      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};
