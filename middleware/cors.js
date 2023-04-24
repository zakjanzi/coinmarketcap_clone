import cors from 'cors';
import axios from 'axios';

const API_KEY = process.env.API_KEY;

// Apply the middleware
const corsMiddleware = cors({
  methods: ['GET', 'HEAD'],
});

export default async function handler(req, res) {
  // Allow CORS
  await corsMiddleware(req, res);

  // API call here
  const response = await axios.get(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR&api_key=${API_KEY}`
  );
  const data = response.data;

  // Return
  res.status(200).json(data);
}
