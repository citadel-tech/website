import { Link } from 'react-router-dom'
import { LINKS } from '../../constants/links'
import CoinSwapLogo from '../brand/CoinSwapLogo'

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
            <Link to="/" className="group flex items-center gap-3">
              <CoinSwapLogo className="h-10 w-10 shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.12)]" />
              <span className="leading-none">
                <span className="block text-[1.85rem] font-display font-semibold tracking-[0.04em] text-black sm:text-[2rem]">
                  <span className="text-black">CoinSwap</span>
                </span>
                <span className="mt-2 block text-[0.58rem] font-mono uppercase tracking-[0.18em] text-black/42">
                  Make Bitcoin Fungible Again
                </span>
              </span>
            </Link>
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
        </div>
      </div>
    </footer>
  )
}
