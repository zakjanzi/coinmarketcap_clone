import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';

const API_KEY = process.env.API_KEY;

export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${API_KEY}`
      );
      const data = response.data;
      setCoins(data.Data);
    };

    fetchCoins();

    const intervalId = setInterval(fetchCoins, 60000); // fetch coins every minute

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>A Cryptocurrency Dashboard</title>
        <meta name="description" content="A dashboard displaying coin market data." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <table className='container'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>24H Change</th>
            <th>Marketcap ($)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const { CoinInfo, RAW } = coin;
            const { FullName, Name, ImageUrl } = CoinInfo;
            const { USD } = RAW;
            const { CHANGEPCT24HOUR, MKTCAP } = USD;

            return (
              <tr key={Name}>
                <td className={styles.symbol}>
                  <Image src={`https://www.cryptocompare.com${ImageUrl}`} width={40} height={40} alt={Name} />
                </td>
               <td>
               {FullName}
               </td>
                <td>$ {USD.PRICE.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className={CHANGEPCT24HOUR >= 0 ? styles.green : styles.red}>
                  {CHANGEPCT24HOUR.toFixed(2)}%
                </td>
                <td>$ {MKTCAP.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
