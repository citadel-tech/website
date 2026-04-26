import { LINKS } from '../constants/links'
import CodeBlock from '../components/ui/CodeBlock'

const CONTRACT_TEMPLATE = `P2TR Output:
├── Internal Key: MuSig2_KeyAgg(sender_pk, receiver_pk)
├── Script Tree:
│   ├── Hashlock: OP_SHA256
│   │             <hash>
│   │             OP_EQUALVERIFY
│   │             <receiver_pk>
│   │             OP_CHECKSIG
│   └── Timelock: <locktime>
│                 OP_CLTV
│                 OP_DROP
│                 <sender_pk>
│                 OP_CHECKSIG
└── TapTweak: merkle root of script tree`

const MESSAGE_FLOW = `PHASE 1 - DISCOVERY AND NEGOTIATION
1. Taker  -> Maker1 : GetOffer
2. Maker1 -> Taker  : RespOffer
3. Taker  -> Maker2 : GetOffer
4. Maker2 -> Taker  : RespOffer
5. Taker  -> Maker1 : SwapDetails
6. Maker1 -> Taker  : AckResponse::ACK
7. Taker  -> Maker2 : SwapDetails
8. Maker2 -> Taker  : AckResponse::ACK

PHASE 2 - CONTRACT CREATION
9.  Taker broadcasts the first contract transaction
10. Taker  -> Maker1 : SendersContract
11. Maker1 -> Taker  : SenderContractFromMaker
12. Taker  -> Maker2 : SendersContract
13. Maker2 -> Taker  : SenderContractFromMaker

PHASE 3 - PRIVATE KEY HANDOVER AND SWEEPING
14. Taker  -> Maker1 : PrivateKeyHandover
15. Maker1 -> Taker  : PrivateKeyHandover
16. Taker  -> Maker2 : PrivateKeyHandover
17. Maker2 -> Taker  : PrivateKeyHandover
18. Swap completes successfully`

const FEE_FORMULA = `coinswap_fee =
  base_fee
  + (swap_amount * amount_relative_fee_pct) / 100
  + (swap_amount * refund_locktime * time_relative_fee_pct) / 100`

const V2_HIGHLIGHTS = [
  {
    label: 'Single contract',
    heading: 'Each hop is one Taproot output',
    body:
      'V2 folds the multisig and HTLC logic into a single P2TR contract output. That cuts failure overhead, reduces coordination, and keeps the on-chain shape tighter than the older two-transaction design.',
  },
  {
    label: 'MuSig2 key path',
    heading: 'Successful swaps look like ordinary Taproot spends',
    body:
      'On the happy path, adjacent parties cooperate with a MuSig2 key-path spend, so the hashlock and timelock scripts stay hidden. Script branches only appear when someone has to recover or force completion.',
  },
  {
    label: 'Forward-only finish',
    heading: 'Completion is a key handover, not a long signing dance',
    body:
      'After setup, every participant passes the private key for their outgoing contract to the next hop. The receiver then has both keys for the incoming contract and can complete a cooperative spend locally.',
  },
]

const PHASES = [
  {
    step: '01',
    heading: 'Discovery and route selection',
    body:
      'The taker asks makers for current terms with GetOffer, receives fee and fidelity data in RespOffer, then proposes amount, transaction count, and timelock with SwapDetails. Makers accept or reject with AckResponse.',
  },
  {
    step: '02',
    heading: 'Taproot contract setup',
    body:
      'The taker builds a cycle such as Taker -> Maker0 -> Maker1 -> Taker. Every hop uses the same hash but its own adjacent keys and staggered locktime. Contract details are relayed with SendersContract and SenderContractFromMaker.',
  },
  {
    step: '03',
    heading: 'Private key handover and sweep',
    body:
      'Once all contracts are live, each party forwards the secret key for its outgoing hop. The next receiver now controls both keys for the incoming MuSig2 contract and sweeps it without more interactive signing rounds.',
  },
  {
    step: '04',
    heading: 'Recovery if anyone stalls',
    body:
      'If cooperation breaks down, the receiver can fall back to the hashlock path when the preimage is known, and the sender can reclaim funds later through the timelock path. Staggered locktimes preserve atomicity across the route.',
  },
]

const PRIVACY_POINTS = [
  'The taker coordinates the route, while each maker only sees its own adjacent hop and the taker connection.',
  'On successful completion, the chain sees ordinary Taproot key-path spends instead of an exposed swap script tree.',
  'The protocol supports splitting value across multiple transactions, which makes amount-correlation attacks harder than a single equal-value transfer.',
]

const GUARANTEES = [
  'Non-custodial: nobody hands coins to a trusted intermediary.',
  'Atomic: the route completes end-to-end or each participant has a unilateral recovery path.',
  'Sybil-resistant: maker offers include fidelity proofs, so fake liquidity requires real locked bitcoin.',
]

function InlineCode({ children }) {
  return <code className="inline-code">{children}</code>
}

function DeepDiveSection({ heading, children }) {
  return (
    <div>
      <h3 className="type-card-title mb-3 font-display font-semibold text-cream">{heading}</h3>
      <div className="type-small space-y-3 font-body text-cream/70">{children}</div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <>
      <title>How It Works — CoinSwap</title>
      <meta
        name="description"
        content="A concise walkthrough of the CoinSwap v2 protocol: taker-driven route discovery, Taproot contract setup, MuSig2 key-path spends, and atomic recovery paths."
      />

      <div className="site-shell py-8 space-y-7">
        <section>
          <p className="section-label mb-3">// Protocol V2</p>
          <h1 className="type-page-title font-display font-bold text-cream mb-3">
            How CoinSwap V2 Actually Runs
          </h1>
          <p className="type-subtitle text-cream/60 font-body max-w-4xl">
            CoinSwap v2 is a taker-coordinated, multi-hop atomic swap protocol built around Taproot
            contracts and MuSig2. You route value through independent makers, receive different
            coins back, and keep a recovery path if anyone disappears mid-swap.
          </p>
        </section>

        <section className="section-rule">
          <div className="grid gap-4 lg:grid-cols-3">
            {V2_HIGHLIGHTS.map(({ label, heading, body }) => (
              <div key={heading} className="border border-dotted border-black/20 bg-black/[0.02] p-5">
                <p className="type-caption mb-2 font-mono uppercase tracking-[0.18em] text-cream/65">
                  {label}
                </p>
                <h2 className="type-card-title mb-2 font-display font-semibold text-cream">{heading}</h2>
                <p className="type-small font-body text-cream/68">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-rule">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div>
              <p className="section-label mb-3">// Route Shape</p>
              <h2 className="type-section-title font-display font-semibold text-cream mb-3">
                The taker builds a cycle, then relays every hop
              </h2>
              <p className="type-body font-body text-cream/70 max-w-2xl mb-4">
                Makers do not talk to each other directly. The taker gathers offers, chooses the
                route, and relays protocol messages between adjacent parties. That keeps maker
                software simple and limits what any single maker can learn about the full swap.
              </p>
              <div className="type-ui border border-dotted border-black/20 bg-[#fbf8f2] px-4 py-5 font-mono text-black/80">
                <p>Taker -&gt; Maker0 -&gt; Maker1 -&gt; ... -&gt; Taker</p>
                <p className="mt-2 text-black/55">same hash across all hops, different keys and locktimes per hop</p>
              </div>
            </div>

            <div className="border border-dotted border-black/20 bg-black/[0.02] p-5">
              <p className="section-label mb-3">// Core Guarantees</p>
              <div className="space-y-3">
                {GUARANTEES.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-cream">+</span>
                    <p className="type-small font-body text-cream/68">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule">
          <p className="section-label mb-3">// Lifecycle</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">
            The protocol in four phases
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {PHASES.map(({ step, heading, body }) => (
              <div key={step} className="border border-dotted border-black/20 bg-black/[0.02] p-5">
                <p className="type-meta mb-2 font-mono text-cream/65">{step}</p>
                <h3 className="type-card-title mb-2 font-display font-semibold text-cream">{heading}</h3>
                <p className="type-small font-body text-cream/68">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-rule">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="section-label mb-3">// Contract Anatomy</p>
              <h2 className="type-section-title font-display font-semibold text-cream mb-3">
                One Taproot contract holds both the happy path and the recovery logic
              </h2>
              <p className="type-body font-body text-cream/70 mb-4">
                Every hop is a single P2TR output with a MuSig2 internal key and two script leaves.
                The receiver can force completion with the hashlock if needed, while the sender can
                recover after the CLTV deadline. When things go right, neither script is revealed.
              </p>
              <CodeBlock
                code={CONTRACT_TEMPLATE}
                language="text"
                className="w-full"
                wrapLongLines
              />
            </div>

            <div className="space-y-4">
              <div className="border border-dotted border-black/20 bg-black/[0.02] p-5">
                <h3 className="type-card-title mb-2 font-display font-semibold text-cream">
                  Why the private key handover matters
                </h3>
                <p className="type-small font-body text-cream/68">
                  V2 ends the swap by transferring the outgoing contract secret key forward. The next
                  hop can then derive the cooperative spend for its incoming contract locally instead
                  of waiting through a longer multi-round signing exchange.
                </p>
              </div>
              <div className="border border-dotted border-black/20 bg-black/[0.02] p-5">
                <h3 className="type-card-title mb-2 font-display font-semibold text-cream">
                  Why Taproot lowers recovery cost vs V1
                </h3>
                <p className="type-small font-body text-cream/68">
                  V1 used a separate funding transaction plus a separate contract transaction for
                  each hop. V2 collapses that into one Taproot contract output, so an aborted swap
                  has fewer on-chain transactions to publish and unwind.
                </p>
                <p className="type-small font-body text-cream/68">
                  That means cheaper failure handling, cheaper recovery transactions, and fewer
                  protocol round trips before the swap can either complete or fall back safely.
                </p>
              </div>
              <div className="border border-dotted border-black/20 bg-black/[0.02] p-5">
                <h3 className="type-card-title mb-2 font-display font-semibold text-cream">
                  What stays consistent across the route
                </h3>
                <p className="type-small font-body text-cream/68">
                  The swap uses one hash for the full route, but each hop has its own adjacent
                  pubkeys and locktime. Those locktimes are staggered so refund windows open in the
                  correct order if recovery becomes necessary.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="section-label mb-3">// Privacy Model</p>
              <h2 className="type-section-title font-display font-semibold text-cream mb-3">
                Privacy comes from route separation and ordinary-looking spends
              </h2>
              <div className="space-y-3">
                {PRIVACY_POINTS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-cream">+</span>
                    <p className="type-small font-body text-cream/68">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-dotted border-black/20 bg-black/[0.02] p-5">
              <p className="section-label mb-3">// Maker Selection</p>
              <h2 className="type-card-title font-display font-semibold text-cream mb-3">
                Offers include fees, size limits, locktime bounds, and fidelity proof
              </h2>
              <p className="type-small font-body text-cream/68 mb-3">
                The taker does not blindly pick any maker. Each <InlineCode>RespOffer</InlineCode>{' '}
                carries pricing terms plus a verifiable fidelity proof. That bond makes Sybil attacks
                expensive because fake market share requires real bitcoin locked for time.
              </p>
              <p className="type-small font-body text-cream/68">
                Once the taker chooses a route, it proposes the swap amount, number of transaction
                splits, and refund timelock with <InlineCode>SwapDetails</InlineCode>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-rule">
          <p className="section-label mb-4">// Builder Notes</p>
          <div className="space-y-6">
            <DeepDiveSection heading="Message set">
              <p>
                The v2 diagram uses a tight seven-message vocabulary:{' '}
                <InlineCode>GetOffer</InlineCode>, <InlineCode>RespOffer</InlineCode>,{' '}
                <InlineCode>SwapDetails</InlineCode>, <InlineCode>AckResponse</InlineCode>,{' '}
                <InlineCode>SendersContract</InlineCode>,{' '}
                <InlineCode>SenderContractFromMaker</InlineCode>, and{' '}
                <InlineCode>PrivateKeyHandover</InlineCode>. For a 1 taker + 2 maker route, the
                image shows the exact sequence below.
              </p>
              <p>
                This is the cooperative happy-path flow from the image. Recovery still relies on the
                hashlock and timelock branches, but those fallback spends are not drawn as separate
                network messages in the v2 diagram.
              </p>
              <CodeBlock code={MESSAGE_FLOW} language="text" />
            </DeepDiveSection>

            <DeepDiveSection heading="Fee model">
              <p>
                Makers quote three pricing components in the spec: a fixed base fee, an amount-based
                fee, and a time-based fee that scales with refund locktime. The taker also pays the
                mining fees required to fund the route.
              </p>
              <CodeBlock code={FEE_FORMULA} language="text" />
            </DeepDiveSection>

            <DeepDiveSection heading="Failure handling">
              <p>
                The swap stays atomic because every participant has a fallback. If someone vanishes
                after setup, funds are not left in limbo forever: receivers can use the hashlock
                branch once the preimage is available, and senders eventually reclaim via the
                timelock branch.
              </p>
              <p>
                The security docs also call out abort scenarios explicitly. A taker that disappears
                after setup can still recover later, while makers that drop early can be excluded from
                future route selection.
              </p>
            </DeepDiveSection>

            <DeepDiveSection heading="Fidelity bonds">
              <p>
                A maker proves skin in the game with a time-locked bitcoin bond. The bond data,
                certificate hash, and signature are bundled into the fidelity proof returned during
                offer discovery. Takers verify that proof before trusting the offer book.
              </p>
              <p>
                In practical terms, the maker locks bitcoin into a timelocked output and ties that
                bond to its network identity with a signed certificate. The proof includes the bond
                outpoint, locked amount, locktime, pubkey, and certificate expiry, plus a signature
                from the same key that controls the bond.
              </p>
              <p>
                The maker&apos;s Tor address is also announced in the same fidelity transaction via an
                <InlineCode>OP_RETURN</InlineCode> output. That matters because it means the market
                can be rediscovered directly from the blockchain: anyone can scan chain data, find
                fidelity announcements, recover maker addresses, and rebuild the offer universe
                without depending on a central directory snapshot.
              </p>
              <p>
                The point is not just reputation. Fidelity bonds are a Sybil-resistance mechanism:
                if an attacker wants to appear as many independent makers, they must lock up real
                capital behind each identity. The spec&apos;s bond-value model also rewards putting
                more capital behind one strong maker instead of splitting the same coins across many
                weaker ones.
              </p>
              <p>
                Bond value also changes over time. Longer locktimes increase value, while an expired
                or nearly expired bond becomes less persuasive to takers. That gives honest makers an
                incentive to roll bonds forward before they decay too far.
              </p>
            </DeepDiveSection>
          </div>
        </section>

        <section className="section-rule flex flex-wrap gap-4">
          <a
            href={LINKS.protocol_v2}
            target="_blank"
            rel="noopener noreferrer"
            className="simple-link type-ui font-body"
          >
            Protocol v2 spec ↗
          </a>
          <a
            href={LINKS.protocol_spec}
            target="_blank"
            rel="noopener noreferrer"
            className="simple-link type-ui font-body"
          >
            Full specification repo ↗
          </a>
          <a
            href={LINKS.coinswap_repo}
            target="_blank"
            rel="noopener noreferrer"
            className="simple-link type-ui font-body"
          >
            Core implementation ↗
          </a>
        </section>
      </div>
    </>
  )
}
