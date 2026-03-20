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
    <footer className="mt-auto border-t border-dotted border-black/15 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <p className="type-small mb-5 font-mono text-black/35">
          <span className="text-black/60">user@coinswap</span>
          <span className="text-black/30">:~$</span>
          <span className="text-black/50"> cat ./network-footer.sys</span>
        </p>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-[1.9rem] font-display font-semibold tracking-[0.08em]">
              <span className="text-black">&gt;_ </span>
              <span className="text-black">CoinSwap</span>
            </p>
            <p className="type-small max-w-xs text-black/48 font-body">
              Non-custodial, privacy-preserving Bitcoin swaps over Tor.
            </p>
          </div>

          <div>
          <p className="mb-3 text-sm font-mono uppercase tracking-[0.2em] text-black/45">// routes</p>
            <ul className="space-y-2">
              {INTERNAL.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[15px] font-mono text-black/52 transition-colors hover:text-black">
                    &gt; {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
          <p className="mb-3 text-sm font-mono uppercase tracking-[0.2em] text-black/45">// external</p>
            <ul className="space-y-2">
              {EXTERNAL.map(({ href, label }) => (
                href && (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-mono text-black/52 transition-colors hover:text-black"
                    >
                      &gt; {label} ↗
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-dotted border-black/15 pt-4 sm:flex-row">
          <p className="text-sm font-mono text-black/28">
            // Built by Citadel Tech. Open source under MIT.
          </p>
          <p className="text-sm font-mono text-black/28">
            testnet:{' '}
            <a href={LINKS.mutinynet} target="_blank" rel="noopener noreferrer" className="text-black transition-colors hover:text-black/70">
              mutinynet.com ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
