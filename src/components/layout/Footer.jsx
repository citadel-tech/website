import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { LINKS } from '../../constants/links'
import OpenSwapLogo from '../brand/OpenSwapLogo'

const INTERNAL = [
  { to: '/how-it-works', label: 'how-it-works' },
  { to: '/takers',       label: 'takers' },
  { to: '/makers',       label: 'makers' },
  { to: '/market',       label: 'market' },
  { to: '/docs',         label: 'docs' },
]

const CITADEL_FOSS_LOGO = `${import.meta.env.BASE_URL}citadel-foss.png`

const EXTERNAL = [
  { href: LINKS.openswap_repo,  label: 'github' },
  { href: LINKS.protocol_spec,  label: 'protocol-spec' },
  { href: LINKS.releases,       label: 'releases' },
  { href: LINKS.contributing,   label: 'contributing' },
]

export default function Footer() {
  return (
    <footer className="site-footer mt-auto border-t border-dotted border-black/15 bg-transparent">
      <div className="site-footer__beam" aria-hidden="true" />
      <div className="site-shell py-10">

        <p className="type-small mb-5 font-mono text-black/65">
          <span className="text-black/80">user@openswap</span>
          <span className="text-black/65">:~$</span>
          <span className="text-black/65"> cat ./network-footer.sys</span>
        </p>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
          <div>
            <Link to="/" className="group flex items-center gap-3">
              <OpenSwapLogo className="h-10 w-10 shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.12)]" />
              <span className="leading-none">
                <span className="type-brand block font-display font-semibold tracking-[0.04em] text-black">
                  <span className="text-black">OpenSwap</span>
                </span>
                <span className="type-caption mt-2 block font-mono uppercase tracking-[0.18em] text-black/65">
                  Open Network for Atomic Swaps
                </span>
              </span>
            </Link>
          </div>

          <div>
          <p className="type-ui mb-3 font-mono uppercase tracking-[0.2em] text-black/65">// routes</p>
            <ul className="space-y-2">
              {INTERNAL.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="type-small font-mono text-black/65 transition-colors hover:text-black">
                    &gt; {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
          <p className="type-ui mb-3 font-mono uppercase tracking-[0.2em] text-black/65">// external</p>
            <ul className="space-y-2">
              {EXTERNAL.map(({ href, label }) => (
                href && (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-small inline-flex items-center gap-1.5 font-mono text-black/65 transition-colors hover:text-black"
                    >
                      &gt; {label}
                      <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>

          <a
            href={LINKS.github_org}
            target="_blank"
            rel="noopener noreferrer"
            className="citadel-credit md:col-start-4 md:row-start-1"
          >
            <span className="citadel-credit__eyebrow">Developed by</span>
            <span className="citadel-credit__logo-wrap">
              <img src={CITADEL_FOSS_LOGO} alt="Citadel FOSS" className="citadel-credit__logo" />
            </span>
            <span className="citadel-credit__link">citadel-foss <ExternalLink size={12} /></span>
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-dotted border-black/15 pt-4 sm:flex-row">
          <p className="type-ui font-mono text-black/65">
            // Built by Citadel FOSS. Open source under MIT.
          </p>
          <p className="type-caption font-mono uppercase tracking-[0.14em] text-black/45">
            Non-custodial · Atomic · Multi-hop
          </p>
        </div>
      </div>
    </footer>
  )
}
