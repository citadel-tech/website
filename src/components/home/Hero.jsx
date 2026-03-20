import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { LINKS } from '../../constants/links'
import { useLatestRelease } from '../../hooks/useLatestRelease'

export default function Hero() {
  const { tag, url } = useLatestRelease()

  return (
    <section className="relative pt-8 pb-4">
      <div className="px-0 py-6 text-left lg:py-10">
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

          <p className="type-small mb-4 font-mono tracking-[0.16em] text-cream/55">
            &gt; ./coinswap --privacy-level=max --hops=2
          </p>

          <h1
            className="type-hero glitch mb-4 max-w-5xl font-display font-semibold tracking-[0.03em] text-cream"
            data-text="Swap into signal."
          >
            Swap into <span className="text-cream">signal</span>.
            <br />
            Route with <span className="text-cream">Bitcoin-native privacy</span>.
          </h1>

          <p className="type-subtitle mb-7 max-w-3xl text-cream/58">
            <span className="font-mono text-cream/50">// </span>
            CoinSwap breaks the transaction graph at the protocol level. Atomic, multi-hop swaps
            over Tor — no custodian, no trust, no shared history.
          </p>

          <div className="mb-7 flex flex-wrap items-center gap-3">
            <Button as={Link} to="/takers" variant="primary" size="lg">
              ./start_swapping
            </Button>
            <Button
              as="a"
              href={LINKS.coinswap_repo}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              ./view_github
            </Button>
          </div>

          <div className="grid max-w-4xl gap-4 border-t border-dotted border-black/15 pt-4 text-left sm:grid-cols-3">
            <div className="font-mono">
              <span className="type-meta mr-3 uppercase tracking-[0.18em] text-cream/55">privacy mode</span>
              <span className="text-lg font-bold text-cream">multi-hop</span>
            </div>
            <div className="font-mono">
              <span className="type-meta mr-3 uppercase tracking-[0.18em] text-cream/55">transport</span>
              <span className="text-lg font-bold text-cream">Tor only</span>
            </div>
            <div className="font-mono">
              <span className="type-meta mr-3 uppercase tracking-[0.18em] text-cream/55">trust model</span>
              <span className="text-lg font-bold text-cream">non-custodial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
