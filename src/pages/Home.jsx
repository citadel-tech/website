import StatusBanner from '../components/home/StatusBanner'
import Hero from '../components/home/Hero'
import SwapMarket from '../components/home/SwapMarket'
import SwapFlowDiagram from '../components/home/SwapFlowDiagram'
import RoleCards from '../components/home/RoleCards'
import QuickLinks from '../components/home/QuickLinks'
import { useLatestRelease } from '../hooks/useLatestRelease'

const OG_IMAGE = 'https://citadelfoss.xyz/social-preview.png'

export default function Home() {
  const { tag, url } = useLatestRelease()

  return (
    <>
      {/* SEO */}
      <title>OpenSwap</title>
      <meta name="description" content="OpenSwap is a non-custodial, atomic, multi-hop Bitcoin swap protocol. Break the transaction graph over Tor — no trust, no custodian, no shared history." />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content="An Actually Decentralized Atomic-Swap Marketplace" />
      <meta property="og:description" content="Non-custodial, atomic, multi-hop Bitcoin swaps over Tor. Break the transaction graph at the protocol level." />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:site_name"   content="OpenSwap" />
      <meta name="twitter:card"       content="summary_large_image" />
      <meta name="twitter:title"      content="An Actually Decentralized Atomic-Swap Marketplace" />
      <meta name="twitter:description" content="Non-custodial, atomic, multi-hop Bitcoin swaps over Tor." />
      <meta name="twitter:image"      content={OG_IMAGE} />

      <StatusBanner releaseTag={tag} releaseUrl={url} />

      <div className="home-page relative overflow-hidden">
        <div className="home-page__inner site-shell relative pb-20">
          <Hero />
          <SwapFlowDiagram />
          <SwapMarket />
          <RoleCards />
          <QuickLinks />
        </div>
      </div>
    </>
  )
}
