import Image from "next/image";
import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";
import DataTable from "../ui/Datatable";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/coingecko.actions";
import { TrendingCoinFallback } from "./fallback";

export default async function TrendingCoin() {
  
	try {
    const trendingCoins = await fetcher<{
      coins: TrendingCoin[];
    }>("search/trending", undefined, 300);

		const columns: DataTableColumn<TrendingCoin>[] = [
			{
				header: 'Name',
				cellClassName: 'name-cell',
				cell: (coin) => {
					const item = coin.item;

					return(
						<Link href={`/coins/${item.id}`} className="name-link">
							<Image src={item.large} alt={item.name} width={36} height={36} className="name-image" />
							<p>{item.name}</p>
						</Link>
					)
				}
			},
			{
				header: '24 hr change',
				cellClassName: 'change-cell',
				cell: (coin) => {
					const item = coin.item;
					const change = item.data?.price_change_percentage_24h?.usd ?? 0;

          const isTrendingUp = change > 0;

					return(
						<div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
							
							<p>
								{isTrendingUp ? 
									<TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />
								}
								{Math.abs(change).toFixed(2)}%
							</p>
							
						</div>
					)
				}
			},
			{
				header: 'Price',
				cellClassName: 'price-cell',
				cell: (coin) => {
          const price = coin.item.data?.price ?? 0;
          return `$${price.toLocaleString()}`;
        }, 
			}
		];

		return (
			<div id="trending-coins">
				<h4>Trending Coins</h4>
				<DataTable 
					data={trendingCoins?.coins?.slice(0, 6) ?? []} 
					columns={columns} 
					rowKey={(coin) => coin.item.id}
					tableClassName="trending-coins-table"
				/>
			</div>
		);
	} catch (error) {
    // log error
    console.error("TrendingCoin fetch failed:", error);

    // return safe fallback UI
    return <TrendingCoinFallback />;
  }
}