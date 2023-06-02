import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const API_KEY = process.env.API_KEY;

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10; // Number of coins to display per page

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=${API_KEY}`
      );
      const data = response.data.Data;
      // Sort the coins data array
      data.sort(sortByMarketCap);

      // Output the sorted data
      console.log(data);
      console.log('coins', data);
      setCoins(data);
    };

    fetchCoins();

    const intervalId = setInterval(fetchCoins, 3000); // fetch coins every 3 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Sorting function
  function sortByMarketCap(a, b) {
    const mktcapA = a.RAW && a.RAW.USD && a.RAW.USD.MKTCAP;
    const mktcapB = b.RAW && b.RAW.USD && b.RAW.USD.MKTCAP;


    if (mktcapA > mktcapB) {
      return -1;
    }
    if (mktcapA < mktcapB) {
      return 1;
    }
    return 0;
  }

  // Update query params when page changes
  const handlePageChange = (event, page) => {
    console.log(page)
    setCurrentPage(page);
  };

  // Calculate pagination logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const displayedCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

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
          {displayedCoins.map((coin) => {
            const { CoinInfo, RAW } = coin;
            const { FullName, Name, ImageUrl } = CoinInfo;

            // Check if RAW property exists
            if (!RAW) {
              return null; // Skip this iteration if the required property is missing
            }

            const { USD } = RAW;

            // Check if USD property exists
            if (!USD) {
              return null; // Skip this iteration if the required property is missing
            }

            const { CHANGEPCT24HOUR, MKTCAP } = USD;

            return (
              <tr key={Name}>
                <td className={styles.symbol}>
                  <Image src={`https://www.cryptocompare.com${ImageUrl}`} width={40} height={40} alt={Name} />
                </td>
                <td>{FullName}</td>
                <td>$ {USD.PRICE.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className={CHANGEPCT24HOUR >= 0 ? styles.green : styles.red}>
                  {CHANGEPCT24HOUR.toFixed(2)}%
                </td>
                <td>$ {MKTCAP.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Stack spacing={2} justifyContent="center" alignItems="center" marginBottom={10}>
        <Pagination
          count={Math.ceil(coins.length / coinsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </div>
  );
}


// without any pagination endless scrolling feature on social media platforms like Facebook and Instagram is "infinite scrolling."