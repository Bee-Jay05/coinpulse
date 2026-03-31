import DataTable from "@/components/ui/Datatable"

/* ---------------- COIN OVERVIEW FALLBACK ---------------- */

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="header-image bg-dark-400 animate-pulse" />

        <div className="info">
          <div className="header-line-sm bg-dark-400 rounded animate-pulse" />
          <div className="header-line-lg bg-dark-400 rounded animate-pulse" />
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="period-button-skeleton bg-dark-400 animate-pulse"
          />
        ))}
      </div>

      <div className="chart">
        <div className="chart-skeleton bg-dark-400 animate-pulse" />
      </div>
    </div>
  )
}

/* ---------------- TRENDING COINS FALLBACK ---------------- */

type SkeletonRow = {
  id: number
}

const skeletonData: SkeletonRow[] = Array.from({ length: 5 }, (_, i) => ({
  id: i,
}))

const skeletonColumns = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: () => (
      <div className="name-link">
        <div className="name-image bg-dark-400 animate-pulse" />
        <div className="name-line bg-dark-400 rounded animate-pulse" />
      </div>
    ),
  },
  {
    header: "24h",
    cellClassName: "change-cell",
    cell: () => (
      <div className="price-change">
        <div className="change-icon bg-dark-400 animate-pulse" />
        <div className="change-line bg-dark-400 rounded animate-pulse" />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => (
      <div className="price-line bg-dark-400 rounded animate-pulse" />
    ),
  },
]

export function TrendingCoinFallback() {
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>

      <DataTable
        data={skeletonData}
        columns={skeletonColumns}
        rowKey={(row: SkeletonRow) => row.id}
        tableClassName="trending-coins-table"
      />
    </div>
  )
}