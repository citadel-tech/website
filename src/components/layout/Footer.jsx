import { Link } from 'react-router-dom'
import { LINKS } from '../../constants/links'

const INTERNAL = [
  { to: '/how-it-works', label: 'how-it-works' },
  { to: '/takers',       label: 'takers' },
  { to: '/makers',       label: 'makers' },
  { to: '/apps',         label: 'apps' },
]

const EXTERNAL = [
  { href: LINKS.coinswap_repo,  label: 'github' },
  { href: LINKS.protocol_spec,  label: 'protocol-spec' },
  { href: LINKS.releases,       label: 'releases' },
  { href: LINKS.contributing,   label: 'contributing' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-l/15 bg-[linear-gradient(180deg,rgba(2,7,14,0),rgba(2,7,14,0.85))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <p className="mb-8 text-sm font-mono text-green/45">
          <span className="text-green/60">user@coinswap</span>
          <span className="text-blue-l/30">:~$</span>
          <span className="text-cream/50"> cat ./network-footer.sys</span>
        </p>

        <div className="panel-grid panel-glow scan-lines mb-8 grid grid-cols-1 gap-8 border border-white/8 bg-[linear-gradient(145deg,rgba(4,10,13,0.9),rgba(7,12,24,0.92))] p-6 sm:grid-cols-3">
          <div>
            <p className="mb-2 font-display text-[1.9rem] font-semibold tracking-[0.12em]">
              <span className="text-green">&gt;_ </span>
              <span className="text-cream">Coin</span>
              <span className="text-orange">Swap</span>
            </p>
            <p className="max-w-xs text-[15px] leading-relaxed text-cream/48 font-body">
              Non-custodial, privacy-preserving Bitcoin swaps over Tor.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-mono uppercase tracking-[0.24em] text-blue-l/55">// routes</p>
            <ul className="space-y-2">
              {INTERNAL.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[15px] font-mono text-cream/52 transition-colors hover:text-green">
                    &gt; {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-mono uppercase tracking-[0.24em] text-orange/65">// external</p>
            <ul className="space-y-2">
              {EXTERNAL.map(({ href, label }) => (
                href && (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-mono text-cream/52 transition-colors hover:text-orange"
                    >
                      &gt; {label} ↗
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-sm font-mono text-cream/28">
            // Built by Citadel Tech. Open source under MIT.
          </p>
          <p className="text-sm font-mono text-cream/28">
            testnet:{' '}
            <a href={LINKS.mutinynet} target="_blank" rel="noopener noreferrer" className="text-orange transition-colors hover:text-[#ffae4d]">
              mutinynet.com ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
