import { Link } from 'react-router-dom'
import Button from '../coinswap-ui/Button'

const CARDS = [
  {
    role: 'Taker',
    prompt: './taker --swap',
    description: 'Request swaps from the marketplace. Design your swaps, set fee rates, select makers, manage UTXOs, and let the protocol do the rest.',
    highlights: ['Minimum 2 makers per swap', 'Tor required — .onion routing', 'Desktop GUI or CLI'],
    cta: { label: './Taker --SWAP', to: '/takers' },
  },
  {
    role: 'Maker',
    prompt: 'makerd',
    description: 'A lightweight, low-maintenance liquidity server that earns fees. Create and manage fidelity bonds, and act as a bridge between layers.',
    highlights: ['Fidelity bond = reputation', 'Auto-renewing bond lifecycle', 'Docker or native binary'],
    cta: { label: 'makerd', to: '/makers' },
  },
]

export default function RoleCards() {
  return (
    <section>
      <div className="mb-16 flex items-end justify-between gap-4">
        <div>
          <p className="section-label mb-4 text-orange">// choose your runtime</p>
          <h2 className="type-section-title font-display font-semibold tracking-[0.03em] text-cream">
            Two Roles, One Protocol
          </h2>
        </div>
      </div>

      <div className="grid gap-10 lg:gap-14 sm:grid-cols-2">
        {CARDS.map(({ role, prompt, description, highlights, cta }) => (
          <div key={role} className="flex flex-col glass-panel p-10 md:p-14">
            <div className="mb-5 flex items-center gap-2 pb-1">
              <span className="type-meta font-mono uppercase tracking-widest text-orange">{prompt}</span>
            </div>

            <div className="mb-5 flex items-center gap-3">
              <h3 className="type-section-title font-display font-bold tracking-tight text-cream">{role}</h3>
            </div>

            <p className="type-body mb-8 text-cream/60 font-body leading-relaxed">{description}</p>

            <ul className="mb-8 flex-1 space-y-2.5">
              {highlights.map(h => (
                <li key={h} className="type-small flex items-center gap-3 font-mono text-cream/45">
                  <span className="shrink-0 text-green">&gt;</span>
                  {h}
                </li>
              ))}
            </ul>

            <Button as={Link} to={cta.to} variant="outline" size="lg" className="self-start w-fit">
              {cta.label}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
