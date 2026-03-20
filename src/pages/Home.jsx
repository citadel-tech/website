import StatusBanner from '../components/home/StatusBanner'
import Hero from '../components/home/Hero'
import SwapFlowDiagram from '../components/home/SwapFlowDiagram'
import RoleCards from '../components/home/RoleCards'
import QuickLinks from '../components/home/QuickLinks'

const OG_IMAGE = 'https://coinswap.network/og.png' // placeholder — replace when asset exists

export default function Home() {
  return (
    <>
      {/* SEO */}
      <title>CoinSwap — Atomic Bitcoin Privacy</title>
      <meta name="description" content="CoinSwap is a non-custodial, atomic, multi-hop Bitcoin swap protocol. Break the transaction graph over Tor — no trust, no custodian, no shared history." />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content="CoinSwap — Atomic Bitcoin Privacy" />
      <meta property="og:description" content="Non-custodial, atomic, multi-hop Bitcoin swaps over Tor. Break the transaction graph at the protocol level." />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:site_name"   content="CoinSwap" />
      <meta name="twitter:card"       content="summary_large_image" />
      <meta name="twitter:title"      content="CoinSwap — Atomic Bitcoin Privacy" />
      <meta name="twitter:description" content="Non-custodial, atomic, multi-hop Bitcoin swaps over Tor." />
      <meta name="twitter:image"      content={OG_IMAGE} />

      <StatusBanner />

      <div className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 pb-16">
          <Hero />
          <SwapFlowDiagram />
          <RoleCards />
          <QuickLinks />
        </div>
      </div>
    </>
  )
}
