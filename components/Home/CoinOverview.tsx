import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { fetcher } from "@/lib/coingecko.actions";
import { CoinOverviewFallback } from "./fallback";
import CandleStick from "../ui/CandleStick";

export default async function CoinOverview() {
    
  try {
    const [coin, coinOHLCData] = await Promise.all([
			fetcher<CoinDetailsData>("coins/bitcoin", {
				dex_pair_format: "symbol",
			}),
			fetcher<OHLCData[]>("coins/bitcoin/ohlc", {
				vs_currency: "usd",
				days: 1,
				precision: "full",
			}),
		]);

		return (
			<div id="coin-overview">
				<CandleStick 
					data = {coinOHLCData} 
					coinId = {coin.id}
				>
					<div className="header pt-2">
						<Image
							src={coin.image?.large || "/placeholder.png"}
							alt={coin.name}
							width={56}
							height={56}
						/>
						<div className="info">
							<p>{coin.name} / {coin.symbol.toUpperCase()}</p>
							<h1>{formatCurrency(coin.market_data?.current_price?.usd ?? 0)}</h1>
						</div>
					</div>
				</CandleStick>
				
			</div>
		);
	} catch (error) {
		console.error("CoinOverview fetch failed:", error);
		return <CoinOverviewFallback />;
	}
}