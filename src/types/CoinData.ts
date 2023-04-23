export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d: number | null;
  market_cap: number | null;
  total_volume: number | null;
}
