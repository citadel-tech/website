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
    cta: { label: './Taker --SWAP', to: '/takers' },
    borderClass: 'border-white/10 hover:border-white/25',
    promptColor: 'text-cream/70',
    tagColor: 'text-cream/70 border-white/20',
  },
  {
    role: 'Maker',
    prompt: './makerd --start',
    description:
      'A lightweight, low-maintenance liquidity server that earns fees. Create and manage fidelity bonds, and act as a bridge between layers.',
    highlights: [
      'Fidelity bond = reputation',
      'Auto-renewing bond lifecycle',
      'Docker or native binary',
    ],
    cta: { label: './Maker --RUN', to: '/makers' },
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

            <p className="type-body mb-4 text-cream/70 font-body">{description}</p>

            <ul className="mb-5 flex-1 space-y-1.5">
              {highlights.map(h => (
                <li key={h} className="type-small flex items-center gap-2 font-mono text-cream/65">
                  <span className="shrink-0 text-cream">&gt;</span>
                  {h}
                </li>
              ))}
            </ul>

            <Button
              as={Link}
              to={cta.to}
              variant="outline"
              size="lg"
              className="self-start w-fit hover:shadow-[0_16px_34px_rgba(247,147,26,0.34),0_0_26px_rgba(247,147,26,0.2)] hover:-translate-y-0.5"
            >
              {cta.label}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
