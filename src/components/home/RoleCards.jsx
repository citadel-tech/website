import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const CARDS = [
  {
    role: 'Taker',
    prompt: './taker --swap',
    tagline: 'swap privately',
    description:
      'Send one set of coins, receive a different set with no shared on-chain history. Choose your hops, set your amount, let the protocol do the rest.',
    highlights: [
      'Minimum 2 makers per swap',
      'Tor required — .onion routing',
      'Desktop GUI or CLI',
    ],
    cta: { label: './get_started_as_taker', to: '/takers' },
    borderClass: 'border-blue-l/20 hover:border-blue-l/40',
    promptColor: 'text-blue-l',
    tagColor: 'text-blue-l border-blue-l/30',
  },
  {
    role: 'Maker',
    prompt: './makerd --start',
    tagline: 'earn fees passively',
    description:
      'Run an always-on node. Post a fidelity bond. Route swaps for takers and earn fees — without ever custodying user funds.',
    highlights: [
      'Fidelity bond = reputation',
      'Auto-renewing bond lifecycle',
      'Docker or native binary',
    ],
    cta: { label: './run_a_maker_node', to: '/makers' },
    borderClass: 'border-orange/20 hover:border-orange/40',
    promptColor: 'text-orange',
    tagColor: 'text-orange border-orange/30',
  },
]

export default function RoleCards() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.24em] text-blue-l/55">// choose your runtime</p>
          <h2 className="font-display text-3xl font-semibold tracking-[0.08em] text-cream sm:text-4xl">
            Two entry points. One protocol.
          </h2>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {CARDS.map(({ role, prompt, tagline, description, highlights, cta, borderClass, promptColor, tagColor }) => (
          <div
            key={role}
            className={`panel-grid panel-glow scan-lines flex flex-col overflow-hidden border bg-[linear-gradient(145deg,rgba(5,12,15,0.92),rgba(7,12,24,0.92))] p-7 transition duration-200 hover:-translate-y-1 ${borderClass}`}
          >
            <div className="mb-5 flex items-center gap-2 border-b border-white/8 pb-3">
              <span className="w-2 h-2 rounded-full bg-green/40" />
              <span className="w-2 h-2 rounded-full bg-orange/40" />
              <span className="w-2 h-2 rounded-full bg-blue-l/40" />
              <span className={`ml-2 font-mono text-xs uppercase tracking-[0.16em] ${promptColor}`}>{prompt}</span>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div>
                <span className={`mb-2 inline-block border px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] ${tagColor}`}>
                  [{tagline}]
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-[0.08em] text-cream">{role}</h3>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-cream/55 font-body">{description}</p>

            <ul className="mb-7 flex-1 space-y-2">
              {highlights.map(h => (
                <li key={h} className="flex items-center gap-2 text-sm font-mono text-cream/50">
                  <span className="text-green shrink-0">&gt;</span>
                  {h}
                </li>
              ))}
            </ul>

            <Button as={Link} to={cta.to} variant="outline" className="w-full justify-center">
              {cta.label}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
