import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const CARDS = [
  {
    role: 'Taker',
    prompt: './taker --swap',
    description:
      'Request swaps from the marketplace. Design your swaps, set fee rates, select makers, manage UTXOs, and let the protocol do the rest.',
    highlights: [
      'Minimum 2 makers per swap',
      'Tor required — .onion routing',
      'Desktop GUI or CLI',
    ],
    cta: { label: './get_started_as_taker', to: '/takers' },
    borderClass: 'border-white/10 hover:border-white/25',
    promptColor: 'text-cream/70',
    tagColor: 'text-cream/70 border-white/20',
  },
  {
    role: 'Maker',
    prompt: './makerd --start',
    description:
      'Light weight minimal maintenance liquidity server earning fees. Create and manage fidelity bonds. Act as a bridge between layers.',
    highlights: [
      'Fidelity bond = reputation',
      'Auto-renewing bond lifecycle',
      'Docker or native binary',
    ],
    cta: { label: './run_a_maker_node', to: '/makers' },
    borderClass: 'border-white/10 hover:border-white/25',
    promptColor: 'text-cream/70',
    tagColor: 'text-cream/70 border-white/20',
  },
]

export default function RoleCards() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="section-label mb-2">// choose your runtime</p>
          <h2 className="type-section-title font-display font-semibold tracking-[0.04em] text-cream">
            Two Roles, One Protocol
          </h2>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {CARDS.map(({ role, prompt, description, highlights, cta, borderClass, promptColor }) => (
          <div
            key={role}
            className={`section-rule flex flex-col ${borderClass}`}
          >
            <div className="mb-3 flex items-center gap-2 pb-1">
              <span className={`type-meta ml-2 font-mono uppercase tracking-[0.14em] ${promptColor}`}>{prompt}</span>
            </div>

            <div className="mb-3 flex items-center gap-3">
              <div>
                <h3 className="type-section-title font-display font-semibold tracking-[0.04em] text-cream">{role}</h3>
              </div>
            </div>

            <p className="type-body mb-4 text-cream/55 font-body">{description}</p>

            <ul className="mb-5 flex-1 space-y-1.5">
              {highlights.map(h => (
                <li key={h} className="type-small flex items-center gap-2 font-mono text-cream/50">
                  <span className="shrink-0 text-cream">&gt;</span>
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
