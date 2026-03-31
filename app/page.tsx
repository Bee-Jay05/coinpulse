import TrendingCoin from "@/components/Home/TrendingCoin"
import CoinOverview from "@/components/Home/CoinOverview"
import { Suspense } from "react"
import {
  CoinOverviewFallback,
  TrendingCoinFallback,
} from "@/components/Home/fallback"

export default async function Page() {

  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinFallback />}>
          <TrendingCoin />
        </Suspense>        
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Top Categories</p>
      </section>
    </main>
  )
}