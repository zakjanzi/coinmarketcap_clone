import { useState } from "react";
import { CoinData } from "../types/CoinData";
import styles from "./Table.module.css";
import { getChangeColor } from "../lib/coingecko";

interface Props {
  coins: CoinData[];
}

const Table = ({ coins }: Props) => {
  return (
    <>
    <h1 style={{ fontSize: '3em', fontWeight: 300, textAlign: 'center', color: '#4DC3FA', fontFamily: 'Open Sans, sans-serif', }}>A Crypto Dashboard</h1>
    <br></br>
    <p style={{ fontSize: '1em', fontWeight: 300, textAlign: 'center', display: 'block', lineHeight: '1em', paddingBottom: '2em', color: '#FFF842', fontFamily: 'Open Sans, sans-serif', }}>A clone of coinmarketcap.com with some UI improvements.</p>

    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Market Cap</th>
          <th>Volume (24h)</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.id}>
            <td>{index + 1}</td>
            <td>{coin.name}</td>
            <td>$ {coin.current_price.toLocaleString()}</td>
            <td className={coin.price_change_percentage_24h != null ? getChangeColor(coin.price_change_percentage_24h) : ""}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </td>
            <td className={coin.price_change_percentage_7d != null ? getChangeColor(coin.price_change_percentage_7d) : ""}>
              {coin.price_change_percentage_7d?.toFixed(2)}%
            </td>
            <td>$ {coin.market_cap?.toLocaleString()}</td>
            <td>$ {coin.total_volume?.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>

  );
};

export default Table;
