import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const CARDS = [
  {
    role: 'Taker',
    emoji: '🔀',
    tagline: 'Swap privately',
    description:
      'Send one set of coins, receive a different set with no shared on-chain history. Choose your hops, set your amount, let the protocol do the rest.',
    highlights: [
      'Minimum 2 makers per swap',
      'Tor required — .onion routing',
      'Desktop GUI or CLI',
    ],
    cta: { label: 'Get started as a Taker', to: '/takers' },
    accent: 'border-blue/40 hover:border-blue-l/50',
    badge: 'text-blue-l bg-blue/15 border-blue/30',
  },
  {
    role: 'Maker',
    emoji: '⚡',
    tagline: 'Earn fees passively',
    description:
      'Run an always-on node. Post a fidelity bond. Route swaps for takers and earn fees — without ever custodying user funds.',
    highlights: [
      'Fidelity bond = reputation',
      'Auto-renewing bond lifecycle',
      'Docker or native binary',
    ],
    cta: { label: 'Run a Maker node', to: '/makers' },
    accent: 'border-orange/30 hover:border-orange/50',
    badge: 'text-orange bg-orange/15 border-orange/30',
  },
]

export default function RoleCards() {
  return (
    <section className="grid sm:grid-cols-2 gap-6">
      {CARDS.map(({ role, emoji, tagline, description, highlights, cta, accent, badge }) => (
        <div
          key={role}
          className={`rounded-xl border bg-blue/5 p-7 flex flex-col transition-colors ${accent}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{emoji}</span>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-body font-medium border ${badge} mb-1`}>
                {tagline}
              </span>
              <h3 className="font-display text-xl font-semibold text-cream">{role}</h3>
            </div>
          </div>

          <p className="text-cream/65 font-body text-sm leading-relaxed mb-5">{description}</p>

          <ul className="space-y-2 mb-7 flex-1">
            {highlights.map(h => (
              <li key={h} className="flex items-center gap-2 text-cream/55 text-sm font-body">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {h}
              </li>
            ))}
          </ul>

          <Button as={Link} to={cta.to} variant="outline" className="w-full justify-center">
            {cta.label}
          </Button>
        </div>
      ))}
    </section>
  )
}
