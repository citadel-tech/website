import { Link } from 'react-router-dom'
import Button from '../coinswap-ui/Button'

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-44 sm:pb-32">
      <div className="px-0 py-10 text-center lg:py-16">
        <div className="relative mx-auto flex max-w-[76rem] flex-col items-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green/20 bg-green/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-green backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
            </span>
            Protocol Active
          </div>

          <h1 className="type-hero mb-8 max-w-[72rem] font-display font-bold tracking-tight text-cream">
            An Actually Decentralized Atomic-Swap Marketplace
          </h1>

          <p className="type-subtitle mb-14 max-w-[58rem] text-cream/55 leading-relaxed">
            The CoinSwap protocol creates a sybil-resistant, decentralized swap market hosted in
            the Bitcoin blockchain and discoverable over Nostr, enabling trustless atomic swaps
            over Bitcoin and other protocols.
            <br />
            <span className="block h-4" aria-hidden="true" />
            The protocol was first conceptualized by{' '}
            <a
              href="https://bitcointalk.org/index.php?topic=321228.0"
              target="_blank"
              rel="noopener noreferrer"
              className="simple-link"
            >
              Greg Maxwell
            </a>
            , and later prototyped by{' '}
            <span className="inline-block whitespace-nowrap">
              <a
                href="https://github.com/bitcoin-teleport/teleport-transactions"
                target="_blank"
                rel="noopener noreferrer"
                className="simple-link"
              >
                Chris Belcher
              </a>
            </span>.
          </p>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Button as={Link} to="/takers" variant="primary" size="lg">
              ./Taker --SWAP
            </Button>
            <Button as={Link} to="/makers" variant="outline" size="lg">
              ./Maker --RUN
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
