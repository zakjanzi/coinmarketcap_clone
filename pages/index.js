import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';

const API_KEY = process.env.API_KEY;

export default function Home(props) {
  const { result } = props;

  const coins = result.Data;

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
            <th>24H Change</th>
            <th>Price</th>
            <th>Marketcap</th>
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
                <td>
                  {/* <Image src={`https://www.cryptocompare.com${ImageUrl}`} width={20} height={20} alt={Name} /> */}
                  {FullName}
                </td>
                <td>{CHANGEPCT24HOUR.toFixed(2)}%</td>
                <td>{USD.PRICE.toFixed(2)}</td>
                <td>{MKTCAP.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get(
    `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=34&tsym=USD&api_key=${API_KEY}`
  );
  const data = response.data;
  return {
    props: {
      result: data,
    },
  };
}
