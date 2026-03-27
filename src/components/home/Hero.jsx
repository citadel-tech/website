import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative pt-8 pb-0">
      <div className="px-0 py-4 text-center lg:py-8">
        <div className="relative mx-auto flex max-w-[72rem] flex-col items-center">
          <h1
            className="type-hero glitch mb-4 max-w-[72rem] font-display font-semibold tracking-[0.03em] text-cream"
            data-text="An Actually Decentralized Atomic-Swap Marketplace"
          >
            An Actually Decentralized Atomic-Swap Marketplace
          </h1>

          <p className="type-subtitle mb-5 max-w-[72rem] text-cream/58">
            <span className="font-mono text-cream/50"></span>
            The CoinSwap protocol creates a sybil-resistant, decentralized swap market hosted in
            the Bitcoin blockchain and discoverable over Nostr, enabling trustless atomic swaps
            over Bitcoin and other protocols.
            <br />
            <span className="block h-3" aria-hidden="true" />
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

          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-15 gap-y-3">
            <Button
              as={Link}
              to="/takers"
              variant="primary"
              size="lg"
              className="hover:shadow-[0_16px_34px_rgba(247,147,26,0.34),0_0_26px_rgba(247,147,26,0.2)] hover:-translate-y-0.5"
            >
              ./Taker --SWAP
            </Button>
            <Button
              as={Link}
              to="/makers"
              variant="outline"
              size="lg"
              className="hover:shadow-[0_16px_34px_rgba(247,147,26,0.34),0_0_26px_rgba(247,147,26,0.2)] hover:-translate-y-0.5"
            >
              ./Maker --RUN
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
