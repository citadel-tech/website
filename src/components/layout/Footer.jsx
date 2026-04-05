import { Link } from 'react-router-dom'
import { LINKS } from '../../constants/links'
import CoinSwapLogo from '../brand/CoinSwapLogo'

const INTERNAL = [
  { to: '/how-it-works', label: 'how-it-works' },
  { to: '/takers',       label: 'takers' },
  { to: '/makers',       label: 'makers' },
  { to: '/docs',         label: 'docs' },
]

const EXTERNAL = [
  { href: LINKS.coinswap_repo,  label: 'github' },
  { href: LINKS.protocol_spec,  label: 'protocol-spec' },
  { href: LINKS.releases,       label: 'releases' },
  { href: LINKS.contributing,   label: 'contributing' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-cream/8 bg-navy/60 backdrop-blur-sm">
      <div className="site-shell py-12">

        <p className="type-small mb-8 font-mono text-cream/30">
          <span className="text-green/70">user@coinswap</span>
          <span className="text-cream/20">:~$</span>
          <span className="text-cream/40"> cat ./network-footer.sys</span>
        </p>

        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <Link to="/" className="group flex items-center gap-3">
              <CoinSwapLogo className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="leading-none">
                <span className="type-brand block font-display font-semibold tracking-[0.04em] text-cream">
                  CoinSwap
                </span>
                <span className="type-caption mt-2 block font-mono uppercase tracking-[0.18em] text-cream/40">
                  Make Bitcoin Fungible Again
                </span>
              </span>
            </Link>
          </div>

          <div>
            <p className="type-ui mb-4 font-mono uppercase tracking-[0.2em] text-green/50">// routes</p>
            <ul className="space-y-3">
              {INTERNAL.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="type-small font-mono text-cream/40 transition-all duration-200 hover:text-green hover:pl-1">
                    &gt; {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-ui mb-4 font-mono uppercase tracking-[0.2em] text-green/50">// external</p>
            <ul className="space-y-3">
              {EXTERNAL.map(({ href, label }) => (
                href && (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-small font-mono text-cream/40 transition-all duration-200 hover:text-green hover:pl-1"
                    >
                      &gt; {label} ↗
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-dotted border-cream/8 pt-6 sm:flex-row">
          <p className="type-ui font-mono text-cream/25">
            // Built by Citadel Tech. Open source under MIT.
          </p>
        </div>
      </div>
    </footer>
  )
}
