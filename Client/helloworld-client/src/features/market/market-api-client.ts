import config from "@/config";
import axios from "@/server/axios";
import { MarketType } from "./market-types";

export default async function getSymbolsAPI(
  exchange: string
): Promise<string[]> {
  const options = {
    method: "GET",
    url: config.STOCK_MARKET_RAPID_API,
    params: { exchange: "NASDAQ", format: "json" },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };
  try {
    const res = await axios.request(options);
    if (res?.data) {
      const data: { data: MarketType[] } = res.data;
      return data.data.map((i) => i.symbol);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
