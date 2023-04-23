import { GetServerSideProps } from "next";
import Table from "../components/Table";
import { CoinData } from "../types/CoinData";
import { getCoins } from "../lib/coingecko";


import { Global, css } from "@emotion/react"



const globalStyles = css`
  body {
    background-color:#1F2739;
    color:#A7A1AE;
    font-family: 'Open Sans', sans-serif;
  }
`;

interface Props {
  coins: CoinData[];
}

const Home = ({ coins }: Props) => {
  return <Table coins={coins} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const coins = await getCoins();
  return { props: { coins } };
};

export default Home;
