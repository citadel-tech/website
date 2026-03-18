import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { LINKS } from '../../constants/links'
import { useLatestRelease } from '../../hooks/useLatestRelease'

export default function Hero() {
  const { tag, url } = useLatestRelease()

  return (
    <section className="pt-20 pb-16 text-center">
      {/* Release pill */}
      {tag && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue/30 bg-blue/10 text-cream/60 hover:text-cream text-xs font-body mb-8 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block" />
          Latest release: <span className="text-cream font-medium">{tag}</span>
          <span className="text-cream/30">↗</span>
        </a>
      )}

      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] tracking-tight mb-5 max-w-3xl mx-auto">
        Bitcoin privacy,{' '}
        <span className="text-orange">by the protocol.</span>
      </h1>

      <p className="text-cream/60 text-lg sm:text-xl font-body leading-relaxed max-w-xl mx-auto mb-10">
        CoinSwap breaks the transaction graph at the protocol level. Atomic, multi-hop swaps
        over Tor — no custodian, no trust, no shared history.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button as={Link} to="/takers" variant="primary" size="lg">
          Start swapping
        </Button>
        <Button
          as="a"
          href={LINKS.coinswap_repo}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="lg"
        >
          View on GitHub
        </Button>
      </div>
    </section>
  )
}
