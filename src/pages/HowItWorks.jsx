import { LINKS } from '../constants/links'
import Collapsible from '../components/ui/Collapsible'

function InlineCode({ children }) {
  return (
    <code className="font-mono text-orange bg-orange/10 px-1.5 py-0.5 rounded text-xs">{children}</code>
  )
}

function TechSection({ heading, children }) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold text-cream mb-3">{heading}</h3>
      <div className="text-cream/70 font-body text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

// ─── Conceptual cards ─────────────────────────────────────────────────────────

const CONCEPTS = [
  {
    icon: '🔍',
    heading: 'The Problem',
    body: 'Every Bitcoin transaction is recorded permanently on a public blockchain. Chain-analysis firms and surveillance tools trace the flow of funds: who paid whom, how much, and when. This transaction graph cannot be modified after the fact.',
  },
  {
    icon: '🔀',
    heading: 'The Solution',
    body: (
      <>
        Coinswap breaks the transaction graph at the protocol level. You lock coins on one side; you
        receive <em>different</em> coins on the other — with no shared on-chain ancestor. No custodian
        holds your funds at any point. The swap is{' '}
        <strong className="text-cream">atomic</strong>: either it completes fully, or all funds are
        returned via timelocked HTLC refund contracts.
      </>
    ),
  },
  {
    icon: '🌐',
    heading: 'Multi-Hop Routing',
    body: 'Coinswaps are routed through multiple independent makers in a cyclic flow (Taker → Maker0 → Maker1 → Taker). Each hop independently breaks the transaction trail. The service providers are invisible to each other — only the taker (acting as relay) knows the full path.',
  },
  {
    icon: '🔒',
    heading: 'What "Atomic" Means',
    body: 'The swap uses cryptographic HTLC contracts. If anything goes wrong at any stage, timelocked refund transactions allow every participant to recover their funds unilaterally — no maker can steal your coins, no taker can steal a maker\'s coins. The math enforces it.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <>
      <title>How It Works — CoinSwap</title>
      <meta name="description" content="Learn how CoinSwap breaks the Bitcoin transaction graph using atomic multi-hop swaps, Taproot + Musig2, fidelity bonds, and Tor-only networking." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* ── Hero ── */}
        <section>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-tight mb-3">
            How It Works
          </h1>
          <p className="text-cream/60 text-lg font-body leading-relaxed max-w-2xl">
            CoinSwap is an atomic, multi-hop Bitcoin swap protocol. Funds move in a cyclic flow through
            independent makers over Tor — no custodian, no shared history, no trust required.
          </p>
        </section>

        {/* ── Tier 1: Conceptual ── */}
        <section className="space-y-4">
          {CONCEPTS.map(({ icon, heading, body }) => (
            <div key={heading} className="flex gap-5 border border-blue/20 rounded-xl p-5 bg-blue/5 hover:bg-blue/8 transition-colors">
              <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
              <div>
                <h2 className="font-display text-lg font-semibold text-cream mb-1.5">{heading}</h2>
                <p className="text-cream/70 font-body text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Swap flow diagram ── */}
        <section className="border-t border-blue/20 pt-8">
          <p className="text-cream/30 text-xs font-body uppercase tracking-widest mb-5 text-center">Swap flow</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
            {[
              { label: 'Taker',   sub: 'sends 500k sat',    color: 'bg-blue/20 border-blue/40' },
              null,
              { label: 'Maker 1', sub: 'hop 1',              color: 'bg-orange/10 border-orange/30' },
              null,
              { label: 'Maker 2', sub: 'hop 2',              color: 'bg-orange/10 border-orange/30' },
              null,
              { label: 'Taker',   sub: 'receives 438k sat', color: 'bg-blue/20 border-blue/40' },
            ].map((item, i) =>
              item === null ? (
                <div key={i} className="flex sm:items-center">
                  <span className="hidden sm:block text-cream/30 text-lg px-2">→</span>
                  <span className="sm:hidden text-cream/30 text-lg py-1">↓</span>
                </div>
              ) : (
                <div key={item.label + i} className={`rounded-xl border px-5 py-4 text-center min-w-25 ${item.color}`}>
                  <p className="font-display font-semibold text-cream text-sm">{item.label}</p>
                  <p className="text-cream/50 text-xs font-body mt-0.5">{item.sub}</p>
                </div>
              )
            )}
          </div>
          <p className="text-center text-cream/30 text-xs font-body mt-3">
            Different coins in ≠ different coins out · no shared on-chain ancestor
          </p>
        </section>

        {/* ── Tier 2: Technical (collapsible) ── */}
        <section className="border-t border-blue/20 pt-8">
          <p className="text-cream/40 text-xs font-body uppercase tracking-widest mb-4">Technical Details</p>
          <Collapsible summary="Protocol internals — for builders and auditors">

            <TechSection heading="Taproot + Musig2">
              <p>
                Swap transactions use Taproot (P2TR) outputs with Musig2 key aggregation.
                Each contract output has two spending paths:
              </p>
              <div className="rounded-lg border border-blue/30 bg-[#0a1520] p-4 font-mono text-xs space-y-1">
                <p className="text-cream/40"># P2TR output structure</p>
                <p><span className="text-blue-l">Internal Key:</span> <span className="text-cream/80">MuSig2_KeyAgg(party_a_pubkey, party_b_pubkey)</span></p>
                <p><span className="text-blue-l">Script Tree:</span></p>
                <p className="pl-4"><span className="text-amber">├─ Hashlock:</span> <span className="text-cream/60">OP_SHA256 &lt;hash&gt; OP_EQUALVERIFY &lt;receiver&gt; OP_CHECKSIG</span></p>
                <p className="pl-4"><span className="text-amber">└─ Timelock:</span> <span className="text-cream/60">&lt;locktime&gt; OP_CLTV OP_DROP &lt;sender&gt; OP_CHECKSIG</span></p>
              </div>
              <p>
                The <strong className="text-cream">happy path</strong> (cooperative) uses a MuSig2 key spend —
                a single Schnorr signature that appears on-chain as an ordinary P2TR spend, indistinguishable
                from a regular wallet transaction. The <strong className="text-cream">recovery path</strong> uses
                script spend (hashlock or timelock) only when a party misbehaves.
              </p>
            </TechSection>

            <TechSection heading="Protocol Phases (1 Taker + 2 Makers)">
              <ol className="list-decimal list-inside space-y-2 text-cream/60">
                <li><strong className="text-cream">Discovery (8 messages)</strong> — Taker fetches offers from makers, negotiates swap amount, maker count, and timelock</li>
                <li><strong className="text-cream">Contract Creation (4 messages)</strong> — Cyclic P2TR contracts: Taker→Maker0→Maker1→Taker, each funded and broadcast on-chain</li>
                <li><strong className="text-cream">Private Key Handover (4 messages)</strong> — Each party sends their outgoing contract private key forward. Receivers independently perform MuSig2 aggregation and sweep their incoming contract</li>
              </ol>
              <p>
                The protocol uses a <strong className="text-cream">smart-client-dumb-server</strong> model.
                The taker handles all coordination and protocol validation; makers act as lightweight daemons
                responding to messages. This makes maker software easy to run on constrained hardware.
              </p>
            </TechSection>

            <TechSection heading="Private Key Handover (Sweeping)">
              <p>
                After all contracts are on-chain, parties exchange their <em>outgoing</em> contract private keys
                in a forward flow. Each receiver then performs MuSig2 locally:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-cream/60">
                <li>Taker sends its outgoing key to Maker0</li>
                <li>Maker0 aggregates Taker's key + its own, sweeps the Taker→Maker0 contract, then sends Maker0's outgoing key to Taker</li>
                <li>Taker relays Maker0's key to Maker1; Maker1 sweeps Maker0→Maker1 and returns its key</li>
                <li>Taker uses Maker1's key to sweep the final Maker1→Taker contract</li>
              </ol>
              <p>
                No nonce exchange or partial-signature coordination is needed between parties — each independently
                generates nonces and aggregates. This reduces from the classic 16-round protocol to just 4
                key-handover messages.
              </p>
            </TechSection>

            <TechSection heading="Fidelity Bonds">
              <p>
                Makers lock Bitcoin in time-locked UTXOs before registering with{' '}
                <InlineCode>directoryd</InlineCode>. The longer the lock and larger the amount, the
                higher the bond value — a reputation score that takers use to rank makers. This raises
                the economic cost of Sybil attacks: a fake maker network requires real, locked capital.
              </p>
              <ol className="list-decimal list-inside space-y-1 text-cream/60">
                <li>Maker creates timelocked UTXO (bond)</li>
                <li><InlineCode>directoryd</InlineCode> verifies fidelity proof before registering the <InlineCode>.onion</InlineCode> address</li>
                <li>Bond value decays as timelock approaches expiry</li>
                <li><InlineCode>makerd</InlineCode> auto-creates a new bond when the old one expires</li>
                <li>Expired bonds redeemed via <InlineCode>maker-cli</InlineCode></li>
              </ol>
            </TechSection>

            <TechSection heading="Directory Server (directoryd)">
              <p>
                <InlineCode>directoryd</InlineCode> is a lightweight tracker — not a router. Makers
                register their Tor <InlineCode>.onion</InlineCode> address along with a signed fidelity
                proof. Takers query it to discover available makers and their offers (fee rates, min/max
                swap sizes, bond value). The directory does not route traffic or see swap contents.
              </p>
              <p>
                This introduces a centralization vector: if the directory goes offline, takers cannot
                discover makers. Decentralized peer discovery via gossip protocol is an open research
                problem for future versions.
              </p>
            </TechSection>

            <TechSection heading="Tor-Only Networking">
              <p>
                All maker communication happens over Tor hidden services. The taker connects via a local
                SOCKS5 proxy (default <InlineCode>127.0.0.1:9050</InlineCode>). In production, clearnet
                connections to makers are not supported — this prevents IP-level correlation of swap
                participants even if the protocol's cryptographic layer were compromised.
              </p>
            </TechSection>

            <TechSection heading="Refund Safety (Timelock Structure)">
              <p>Refund contracts use a layered locktime structure that ensures each participant in the chain can broadcast their refund before the previous participant's window opens:</p>
              <ul className="list-disc list-inside space-y-1 text-cream/60">
                <li>Base locktime: <InlineCode>REFUND_LOCKTIME = 20 blocks</InlineCode></li>
                <li>Per-hop increment: <InlineCode>REFUND_LOCKTIME_STEP = 20 blocks</InlineCode></li>
                <li>With 2 makers: taker refund locktime = 20 + (2 × 20) = <strong className="text-cream">60 blocks</strong></li>
              </ul>
            </TechSection>

            <TechSection heading="Message Protocol">
              <p>
                Taker-to-maker messages are CBOR-encoded over TCP. The taker prefixes each message with
                a <InlineCode>0x01</InlineCode> byte to distinguish taker connections from other traffic.
                Core messages: <InlineCode>GetOffer</InlineCode> / <InlineCode>RespOffer</InlineCode>,{' '}
                <InlineCode>SendersContract</InlineCode> / <InlineCode>ReceiversContract</InlineCode>,{' '}
                <InlineCode>PrivateKeyHandover</InlineCode>.
              </p>
            </TechSection>

            <TechSection heading="Swap Fee Calculation">
              <p>
                Each maker sets their own <InlineCode>base_fee</InlineCode> (fixed, sats) and{' '}
                <InlineCode>amount_relative_fee_pct</InlineCode> (% of forwarded amount). The taker
                pays cumulative fees across all hops plus estimated mining fees for each maker's
                funding transactions.
              </p>
              <div className="rounded-lg border border-blue/30 bg-[#0a1520] p-4 font-mono text-xs space-y-1">
                <p className="text-cream/40"># Real example (from test suite)</p>
                <p><span className="text-cream/50">Send:</span>          <span className="text-orange">500,000 sat</span></p>
                <p><span className="text-cream/50">2 makers, 3 tx splits</span></p>
                <p><span className="text-cream/50">Maker 1 cost:</span>  <span className="text-amber">36,500 sat</span></p>
                <p><span className="text-cream/50">Maker 2 cost:</span>  <span className="text-amber">24,858 sat</span></p>
                <p><span className="text-cream/50">Taker receives:</span><span className="text-green-400"> 438,642 sat</span></p>
              </div>
            </TechSection>

            <TechSection heading="Coin Selection">
              <p>
                The taker selects UTXOs using the{' '}
                <a href={LINKS.rust_coinselect} target="_blank" rel="noopener noreferrer"
                  className="text-blue-l hover:underline">rust-coinselect ↗</a>{' '}
                library (BnB-based). The wallet tracks UTXO categories — regular, incoming swap,
                outgoing swap, contract, fidelity — and locks non-spendable categories before
                coin selection runs.
              </p>
            </TechSection>

          </Collapsible>
        </section>

        {/* ── Footer links ── */}
        <section className="border-t border-blue/20 pt-6 flex flex-wrap gap-4">
          <a href={LINKS.protocol_spec} target="_blank" rel="noopener noreferrer"
            className="text-blue-l hover:underline text-sm font-body">
            Full Protocol Specification ↗
          </a>
          <a href={LINKS.protocol_flow} target="_blank" rel="noopener noreferrer"
            className="text-blue-l hover:underline text-sm font-body">
            Protocol Flow (v1) ↗
          </a>
          <a href={LINKS.coinswap_repo} target="_blank" rel="noopener noreferrer"
            className="text-blue-l hover:underline text-sm font-body">
            Core implementation ↗
          </a>
        </section>
      </div>
    </>
  )
}
