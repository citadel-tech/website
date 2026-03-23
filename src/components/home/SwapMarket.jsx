const CARDS = [
  {
    label: 'Sybil resistance',
    value: 'Fidelity Bonds',
    description:
      'Makers post fidelity bonds before they can register, which helps keep the market harder to game and easier to trust at a protocol level.',
  },
  {
    label: 'Discovery',
    value: 'Market Hosted on Bitcoin + Nostr',
    description:
      'The market is hosted on Bitcoin Blockchain at the most minimal footprint. The market is also discoverkerlable via Nostr. Removing reliance on any central server',
  },
  {
    label: 'Settlement',
    value: 'HTLC With Recovery',
    description:
      'Efficient Atomic-Swaps with advanced Taproot HTLC+Musig2 protocol, ensuring atomicity at cheapest cost. Recovery triggers automatically to remove fund loss',
  },
  {
    label: 'Maker fees',
    value: 'Competitive pricing',
    description:
      'Makers compete against each other for order flow, which helps keep market fees low while still rewarding operators for providing liquidity.',
  },
  {
    label: 'Cross-chain swaps',
    value: 'Hop Away From BTC',
    description:
      'The market can be used to hop across other layers and protocols, like Lightning, eCash, Liquid, Ark, etc.',
  },
  {
    label: 'Cross-Chain Swaps',
    value: 'Hop Into BTC',
    description:
      'The same market can be used to hop into Bitcoin from other layers, like Lightning, eCash, Liquid, Ark, etc.',
  },
]

export default function SwapMarket() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="section-label mb-2">// market layer</p>
          <h2 className="type-section-title font-display font-semibold tracking-[0.04em] text-cream">
            Swap Market
          </h2>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {CARDS.map(({ label, value, description }) => (
          <article
            key={label}
            className="section-rule flex h-full flex-col rounded-2xl border border-black/10 bg-white/15 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm"
          >
            <p className="type-meta mb-3 font-mono uppercase tracking-[0.16em] text-cream/48">
              {label}
            </p>
            <h3 className="type-section-title mb-3 font-display font-semibold tracking-[0.03em] text-cream">
              {value}
            </h3>
            <p className="type-body text-cream/58 font-body">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
