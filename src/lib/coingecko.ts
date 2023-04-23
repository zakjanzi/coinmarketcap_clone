import { CoinData } from "../types/CoinData";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export async function getCoins(): Promise<CoinData[]> {
  const response = await fetch(`${COINGECKO_API_URL}/coins/markets?vs_currency=usd&per_page=100&sort=market_cap_desc`);
  const coins = await response.json();
  return coins;
}


export const getChangeColor = (change: number) => {
  if (change < 0) {
    return "text-red-500"
  } else {
    return "text-green-500"
  }
}
