import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { LINKS } from '../../constants/links'
import { useLatestRelease } from '../../hooks/useLatestRelease'

export default function Hero() {
  const { tag, url } = useLatestRelease()

  return (
    <section className="relative pt-14 pb-8">
      <div className="panel-grid panel-glow scan-lines relative overflow-hidden border border-white/8 bg-[linear-gradient(145deg,rgba(3,8,10,0.95),rgba(6,10,18,0.92)_58%,rgba(18,10,4,0.78))] px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-[4.5rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,102,0.15),transparent_25%),radial-gradient(circle_at_80%_24%,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(247,147,26,0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute left-6 top-6 h-20 w-20 border-l border-t border-green/25" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-20 w-20 border-b border-r border-orange/25" />
        <div className="relative">
          {tag && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 border border-blue-l/30 bg-blue-l/8 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-blue-l transition-colors hover:border-green/30 hover:text-green"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange" />
              [ latest: <span className="text-green font-medium">{tag}</span> ] ↗
            </a>
          )}

          <p className="mb-5 font-mono text-sm tracking-[0.2em] text-green/55">
            &gt; ./coinswap --privacy-level=max --hops=2
          </p>

          <h1
            className="glitch mx-auto mb-6 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[0.05em] text-cream sm:text-6xl lg:text-8xl"
            data-text="Swap into signal."
          >
            Swap into <span className="text-green">signal</span>.
            <br />
            Route with <span className="text-orange">Bitcoin-native privacy</span>.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-cream/58 sm:text-xl">
            <span className="font-mono text-green/50">// </span>
            CoinSwap breaks the transaction graph at the protocol level. Atomic, multi-hop swaps
            over Tor — no custodian, no trust, no shared history.
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
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

          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-left">
            <div className="border border-green/30 bg-green/8 px-4 py-3 font-mono">
              <span className="mr-3 text-xs uppercase tracking-[0.22em] text-green/65">privacy mode</span>
              <span className="text-xl font-bold text-green">multi-hop</span>
            </div>
            <div className="border border-blue-l/30 bg-blue-l/8 px-4 py-3 font-mono">
              <span className="mr-3 text-xs uppercase tracking-[0.22em] text-blue-l/70">transport</span>
              <span className="text-xl font-bold text-cream">Tor only</span>
            </div>
            <div className="border border-orange/35 bg-orange/8 px-4 py-3 font-mono">
              <span className="mr-3 text-xs uppercase tracking-[0.22em] text-orange/70">trust model</span>
              <span className="text-xl font-bold text-orange">non-custodial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
