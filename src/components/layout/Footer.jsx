import { Link } from 'react-router-dom'
import { LINKS } from '../../constants/links'

const INTERNAL = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/takers',       label: 'Takers' },
  { to: '/makers',       label: 'Makers' },
  { to: '/apps',         label: 'Apps & Tools' },
]

const EXTERNAL = [
  { href: LINKS.coinswap_repo,  label: 'GitHub' },
  { href: LINKS.protocol_spec,  label: 'Protocol Spec' },
  { href: LINKS.releases,       label: 'Releases' },
  { href: LINKS.contributing,   label: 'Contributing' },
]

export default function Footer() {
  return (
    <footer className="border-t border-blue/40 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="font-display font-bold text-lg text-orange mb-2">
              Coin<span className="text-cream">Swap</span>
            </p>
            <p className="text-cream/50 text-sm leading-relaxed">
              Non-custodial, privacy-preserving Bitcoin swaps over Tor.
            </p>
          </div>

          {/* Internal */}
          <div>
            <p className="text-cream/30 text-xs uppercase tracking-widest font-body mb-3">Pages</p>
            <ul className="space-y-2">
              {INTERNAL.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-cream/60 hover:text-cream text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <p className="text-cream/30 text-xs uppercase tracking-widest font-body mb-3">Resources</p>
            <ul className="space-y-2">
              {EXTERNAL.map(({ href, label }) => (
                href && (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/60 hover:text-blue-l text-sm transition-colors"
                    >
                      {label} ↗
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-cream/30 text-xs font-body">
            Built by the Citadel Tech team. Open source under MIT.
          </p>
          <p className="text-cream/30 text-xs font-body">
            Testnet live on{' '}
            <a href={LINKS.mutinynet} target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
              Mutinynet
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
