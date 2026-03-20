import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { LINKS } from '../../constants/links'
import { useLatestRelease } from '../../hooks/useLatestRelease'

export default function Hero() {
  const { tag, url } = useLatestRelease()

  return (
    <section className="relative pt-8 pb-0">
      <div className="px-0 py-4 text-left lg:py-8">
        <div className="relative">
          {tag && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="type-meta mb-6 inline-flex items-center gap-2 border border-black/25 px-3 py-1.5 font-mono uppercase tracking-[0.18em] text-cream transition-colors hover:bg-black/5"
            >
              latest release
              <span className="font-semibold text-cream">{tag}</span>
              ↗
            </a>
          )}

          <h1
            className="type-hero glitch mb-4 max-w-5xl font-display font-semibold tracking-[0.03em] text-cream"
            data-text="An Actually Decentralised Atomic-Swap Marketplace"
          >
            An Actually Decentralised Atomic-Swap Marketplace
          </h1>

          <p className="type-subtitle mb-5 max-w-4xl text-cream/58">
            <span className="font-mono text-cream/50"></span>
            The CoinSwap Protocol creates a sybil-resistant, decentralized swap market hosted in
            the Bitcoin blockchain and discoverable over Nostr, enabling trustless atomic swaps
            over Bitcoin and other protocols.
            <br />
            The protocol was first conceptualised by{' '}
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

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Button as="a" href={LINKS.taker_app} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
              ./TAKER_APP
            </Button>
            <Button as="a" href={LINKS.maker_dashboard} target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
              ./MAKER_DASHBOARD
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
