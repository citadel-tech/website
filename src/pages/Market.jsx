import { useEffect, useMemo, useState } from 'react'
import { LINKS } from '../constants/links'
import MakerGraph from '../components/market/MakerGraph'

const STATUS_TABS = [
  { id: 'good', label: 'Good Makers' },
  { id: 'unresponsive', label: 'Unresponsive' },
]

function RefreshIcon({ spinning = false }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={spinning ? 'animate-spin' : ''}
    >
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
      <path d="M3 12a9 9 0 0 1 15.74-6.26L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform group-hover/bond:-translate-y-0.5 group-hover/bond:translate-x-0.5"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  )
}

function formatSats(value) {
  return `${Math.round(Number(value || 0)).toLocaleString()} sat`
}

function formatPct(value, digits = 4) {
  return Number(value || 0).toFixed(digits)
}

function formatTorAddress(address) {
  if (!address) return 'unknown'

  const clean = address.replace(/\.onion$/i, '')
  if (clean.length <= 22) return address
  return `${clean.slice(0, 10)}...${clean.slice(-8)}.onion`
}

function formatTimestamp(timestamp) {
  if (!timestamp) return 'never'

  const date = new Date(timestamp * 1000)
  if (Number.isNaN(date.getTime())) return 'unknown'

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function unwrapOffer(item) {
  if (!item) return null

  const offer = item.offer || item
  const address =
    offer.address ||
    item.address ||
    item.maker_address ||
    item.tor_address ||
    ''

  return {
    ...offer,
    address,
    last_offer_update_ts: item.last_offer_update_ts || offer.last_offer_update_ts,
    next_offer_check_ts: item.next_offer_check_ts || offer.next_offer_check_ts,
    protocol: item.protocol || offer.protocol,
    state: item.state || offer.state,
    timestamp: item.timestamp || offer.timestamp,
  }
}

function normalizeOfferBuckets(data) {
  if (Array.isArray(data)) {
    const buckets = {
      good: [],
      bad: [],
      unresponsive: [],
    }

    data.forEach((item) => {
      const status = item?.state?.kind || item?.status || 'good'
      const normalizedStatus = buckets[status] ? status : 'good'
      const offer = unwrapOffer(item)

      if (offer) buckets[normalizedStatus].push(offer)
    })

    return buckets
  }

  const offerbook = data?.offerbook || data || {}
  const allMakers = offerbook.makers || offerbook.allMakers

  if (Array.isArray(allMakers)) {
    return normalizeOfferBuckets(allMakers)
  }

  const good = offerbook.goodMakers || offerbook.good || offerbook.offers || []
  const bad = offerbook.badMakers || offerbook.bad || []
  const unresponsive =
    offerbook.unresponsiveMakers ||
    offerbook.unresponsive ||
    offerbook.unresponsive_makers ||
    []

  if (!Array.isArray(good) && !Array.isArray(bad) && !Array.isArray(unresponsive)) {
    return {
      good: [],
      bad: [],
      unresponsive: [],
    }
  }

  return {
    good: Array.isArray(good) ? good.map(unwrapOffer).filter(Boolean) : [],
    bad: Array.isArray(bad) ? bad.map(unwrapOffer).filter(Boolean) : [],
    unresponsive: Array.isArray(unresponsive)
      ? unresponsive.map(unwrapOffer).filter(Boolean)
      : [],
  }
}

function StatCard({ accent, label, value, note }) {
  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-black/15 bg-black/[0.025] p-5 md:p-6">
      <span className={`absolute left-0 top-5 h-20 w-1 rounded-r ${accent}`} />
      <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-black/50">{label}</p>
      <p className="font-display text-3xl font-semibold leading-none text-black md:text-4xl">{value}</p>
      <p className="type-small mt-4 font-body text-black/65">{note}</p>
    </div>
  )
}

function EmptyState({ loading, error, statusLabel }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dotted border-black/15 px-6 py-10 text-center">
      {loading ? (
        <>
          <RefreshIcon spinning />
          <strong className="font-display text-xl text-black">Loading market data...</strong>
          <span className="type-small font-body text-black/55">Fetching makers from the public market endpoint.</span>
        </>
      ) : (
        <>
          <strong className="font-display text-xl text-black">{error ? 'Market data unavailable' : 'No makers found'}</strong>
          <span className="type-small max-w-xl font-body text-black/55">
            {error || `No ${statusLabel.toLowerCase()} makers in the current market snapshot.`}
          </span>
        </>
      )}
    </div>
  )
}

export default function Market() {
  const [offerBuckets, setOfferBuckets] = useState({
    good: [],
    bad: [],
    unresponsive: [],
  })
  const [activeStatus, setActiveStatus] = useState('good')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastSynced, setLastSynced] = useState(null)
  const [responseTimeMs, setResponseTimeMs] = useState(null)

  async function fetchOffers() {
    setLoading(true)
    setError('')
    const startedAt = performance.now()

    try {
      const response = await fetch(LINKS.market_makers_api, {
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        throw new Error(`Endpoint returned ${response.status}`)
      }

      const data = await response.json()
      if (!Array.isArray(data) && (!data || typeof data !== 'object')) {
        throw new Error('Endpoint returned an unexpected payload')
      }

      console.log('[market] makers', data)
      setOfferBuckets(normalizeOfferBuckets(data))
      setLastSynced(new Date())
      setResponseTimeMs(Math.round(performance.now() - startedAt))
    } catch (err) {
      console.error('[market] failed to fetch makers', err)
      setError(
        err.message === 'Failed to fetch'
          ? 'Could not fetch makers. If this page is served over HTTPS, the HTTP market endpoint may be blocked by the browser.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOffers()
  }, [])

  const stats = useMemo(() => {
    const goodOffers = offerBuckets.good
    const totalFidelity = goodOffers.reduce((sum, offer) => sum + Number(offer.fidelity_bond?.amount || 0), 0)
    const totalLiquidity = goodOffers.reduce((sum, offer) => sum + Number(offer.max_size || 0), 0)

    return {
      totalFidelity,
      totalLiquidity,
      counts: {
        good: offerBuckets.good.length,
        bad: offerBuckets.bad.length,
        unresponsive: offerBuckets.unresponsive.length,
      },
    }
  }, [offerBuckets])

  const displayedOffers = offerBuckets[activeStatus] || []
  const activeTab = STATUS_TABS.find((tab) => tab.id === activeStatus) || STATUS_TABS[0]

  return (
    <>
      <title>Market — OpenSwap</title>
      <meta
        name="description"
        content="Live OpenSwap maker market: public maker data, liquidity depth, fidelity bonds, fees, and Tor maker addresses."
      />

      <div className="site-shell py-8">
        <section className="market-terminal overflow-hidden rounded-[1.5rem] border border-black/15 bg-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-dotted border-black/15 px-5 py-4">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-black/55">OpenSwap - Market</p>
            <div className="hidden items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-black/50 sm:flex">
              <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_14px_rgba(0,255,102,0.8)]" />
              <span>Live API</span>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="type-page-title font-display font-bold text-black">Market</h1>
                <p className="type-body mt-2 max-w-3xl font-body text-black/65">
                  Live view of OpenSwap makers routing through the public market endpoint.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchOffers}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-navy transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
              >
                <RefreshIcon spinning={loading} />
                {loading ? 'Refreshing' : 'Refresh'}
              </button>
            </div>

            <div className="mb-6 grid gap-4 lg:grid-cols-3">
              <StatCard
                accent="bg-amber"
                label="Fidelity Locked"
                value={formatSats(stats.totalFidelity)}
                note={`Bonded across ${stats.counts.good} active makers.`}
              />
              <StatCard
                accent="bg-orange"
                label="Total Liquidity"
                value={formatSats(stats.totalLiquidity)}
                note="Advertised max swap depth available for routing."
              />
              <StatCard
                accent="bg-blue-l"
                label="Active Makers"
                value={stats.counts.good}
                note={`${stats.counts.good} good - ${stats.counts.unresponsive} unresponsive in this window.`}
              />
            </div>

            <MakerGraph
              makers={displayedOffers}
              statusLabel={activeTab.label}
              loading={loading}
            />

            <section className="rounded-[1.25rem] border border-black/15 bg-black/[0.025]">
              <div className="flex flex-col gap-4 border-b border-dotted border-black/15 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {STATUS_TABS.map((tab) => {
                    const active = tab.id === activeStatus

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveStatus(tab.id)}
                        className={`rounded-full px-4 py-2 font-mono text-xs transition ${
                          active
                            ? 'border border-green/35 bg-green/10 font-semibold text-green'
                            : 'text-black/50 hover:bg-black/5 hover:text-black/75'
                        }`}
                      >
                        {tab.label} <span className="ml-1 text-black/55">{stats.counts[tab.id]}</span>
                      </button>
                    )
                  })}
                </div>

                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-black/45">
                  {lastSynced
                    ? `Synced ${lastSynced.toLocaleTimeString()}${responseTimeMs ? ` - ${responseTimeMs} ms` : ''}`
                    : 'Waiting for data'}
                </p>
              </div>

              <div className="p-5">
                {loading || error || displayedOffers.length === 0 ? (
                  <EmptyState loading={loading} error={error} statusLabel={activeTab.label} />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] border-separate border-spacing-y-2 font-mono text-sm">
                      <thead>
                        <tr className="text-left text-[0.68rem] uppercase tracking-[0.18em] text-black/45">
                          <th className="px-4 py-2 font-medium">Tor Address</th>
                          <th className="px-4 py-2 font-medium">Base Fee</th>
                          <th className="px-4 py-2 font-medium">Fee Rate</th>
                          <th className="px-4 py-2 font-medium">Time Rate</th>
                          <th className="px-4 py-2 font-medium">Min Swap</th>
                          <th className="px-4 py-2 font-medium">Max Swap</th>
                          <th className="px-4 py-2 font-medium">Fidelity Bond</th>
                          <th className="px-4 py-2 font-medium">Locktime</th>
                          <th className="px-4 py-2 font-medium">Seen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedOffers.map((offer, index) => {
                          const bond = offer.fidelity_bond || {}
                          const txid = bond.outpoint?.txid || 'unknown'

                          return (
                            <tr key={`${activeStatus}-${offer.address}-${txid}-${index}`} className="group/row">
                              <td className="rounded-l-xl border-y border-l border-black/10 bg-white/20 px-4 py-3 text-black transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5" title={offer.address}>
                                {formatTorAddress(offer.address)}
                              </td>
                              <td className="border-y border-black/10 bg-white/20 px-4 py-3 text-black transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5">{formatSats(offer.base_fee)}</td>
                              <td className="border-y border-black/10 bg-white/20 px-4 py-3 text-black transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5">{formatPct(offer.amount_relative_fee_pct, 3)}</td>
                              <td className="border-y border-black/10 bg-white/20 px-4 py-3 text-black transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5">{formatPct(offer.time_relative_fee_pct, 4)}</td>
                              <td className="border-y border-black/10 bg-white/20 px-4 py-3 text-black/55 transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5">{formatSats(offer.min_size)}</td>
                              <td className="border-y border-black/10 bg-white/20 px-4 py-3 text-black/55 transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5">{formatSats(offer.max_size)}</td>
                              <td className="border-y border-black/10 bg-white/20 px-4 py-3 text-black transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5" title={txid}>
                                {txid !== 'unknown' ? (
                                  <a
                                    href={`${LINKS.market_explorer_tx_base}/${txid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open fidelity bond transaction"
                                    className="group/bond inline-flex items-center gap-1.5 rounded-full border border-transparent px-2 py-1 -ml-2 text-black underline decoration-orange/60 underline-offset-4 transition hover:border-orange/35 hover:bg-orange/12 hover:text-orange hover:shadow-[0_0_22px_rgba(247,147,26,0.24)] hover:decoration-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                                  >
                                    <span>{formatSats(bond.amount)}</span>
                                    <ExternalLinkIcon />
                                  </a>
                                ) : (
                                  formatSats(bond.amount)
                                )}
                              </td>
                              <td className="border-y border-black/10 bg-white/20 px-4 py-3 text-black/60 transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5">{Number(bond.lock_time || 0).toLocaleString()}</td>
                              <td className="rounded-r-xl border-y border-r border-black/10 bg-white/20 px-4 py-3 text-black/60 transition group-hover/row:border-orange/25 group-hover/row:bg-orange/5">{formatTimestamp(offer.timestamp)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  )
}
