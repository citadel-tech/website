const CARDS = [
  {
    label: 'Sybil resistance',
    value: 'Fidelity Bonds',
    description: 'Makers post fidelity bonds before they can register, which helps keep the market harder to game and easier to trust at a protocol level.',
  },
  {
    label: 'Discovery',
    value: 'Market Hosted on Bitcoin + Nostr',
    description: 'The market is hosted on the Bitcoin blockchain with a minimal footprint. It is also discoverable via Nostr, removing reliance on any central server.',
  },
  {
    label: 'Settlement',
    value: 'HTLC With Recovery',
    description: 'Efficient atomic swaps with Taproot HTLCs and MuSig2, ensuring atomicity at the lowest possible cost. Recovery triggers automatically to prevent fund loss.',
  },
  {
    label: 'Maker fees',
    value: 'Competitive pricing',
    description: 'Makers compete against each other for order flow, which helps keep market fees low while still rewarding operators for providing liquidity.',
  },
  {
    label: 'Cross-chain swaps',
    value: 'Hop Away From BTC',
    description: 'The market can be used to hop across other layers and protocols, like Lightning, eCash, Liquid, Ark, etc.',
  },
  {
    label: 'Cross-chain swaps',
    value: 'Hop Into BTC',
    description: 'The same market can be used to hop into Bitcoin from other layers, like Lightning, eCash, Liquid, Ark, etc.',
  },
]

export default function SwapMarket() {
  return (
    <section>
      <div className="mb-16 flex items-end justify-between gap-4">
        <div>
          <p className="section-label mb-4 text-orange">// market layer</p>
          <h2 className="type-section-title font-display font-semibold tracking-[0.03em] text-cream">
            Swap Market
          </h2>
        </div>
      </div>

      <div className="grid gap-8 md:gap-10 lg:grid-cols-3">
        {CARDS.map(({ label, value, description }, i) => (
          <article key={i} className="flex h-full flex-col glass-panel p-10">
            <p className="type-meta mb-5 font-mono uppercase tracking-widest text-orange">
              0{i + 1}
            </p>
            <h3 className="type-card-title mb-4 font-display font-semibold tracking-tight text-cream">
              {value}
            </h3>
            <p className="type-body text-cream/55 font-body leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
