import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();


export default function Home(props) {
  const { data } = props.result;

  const formatPercent = number =>
    `${new Number(number).toFixed(2)}%`

    const formatterUS = new Intl.NumberFormat('en-US')

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat (
      'en-US',
      {
        style: 'currency',
        currency: 'usd',
        maximumSignificantDigits
      })
      .format(number);
  return (
    <div className={styles.container}>
      <Head>
        <title>CoinMarketCap Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Coinmarketcap Clone</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24HR Canges</th>
            <th>Price</th>
            <th>Low (24h)</th>
            <th>Max Supply</th>
            <th>All time High</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
            <td> <img 
                    src={coin.image}
                    style={{width: 25, height: 25, marginRight: 10}} />
            {coin.symbol.toUpperCase()}</td>
            <td>
              <span className={coin.price_change_percentage_24h > 0 ? (
                'text-success') : 'text-danger'}>

              {formatPercent(coin.price_change_percentage_24h)}
              </span>
              </td>
            <td>{formatDollar(coin.current_price, 20)}</td>
            <td>{formatDollar(coin.low_24h)}</td>
            <td>
                
              {formatterUS.format(coin.max_supply)}

            </td>
            <td>${formatterUS.format(coin.ath)}</td>
            <td>{formatDollar(coin.market_cap, 12)}</td>
              
              </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}


export async function getServerSideProps (context) {
const params = {
  order: CoinGecko.ORDER.MARKET_CAP_DESC
}
const result = await coinGeckoClient.coins.markets(params);
return {
  props: {
    result
  }
};
}