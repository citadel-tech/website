import { LINKS } from '../constants/links'
import CodeBlock from '../components/ui/CodeBlock'
import TabGroup from '../components/ui/TabGroup'
import Badge from '../components/ui/Badge'

// ─── CLI snippets ─────────────────────────────────────────────────────────────

const CODE_BUILD = `git clone ${LINKS.coinswap_repo}
cd coinswap
cargo build --release --bin makerd --bin maker-cli

# Optional: install system-wide
sudo install ./target/release/makerd /usr/local/bin/
sudo install ./target/release/maker-cli /usr/local/bin/`

const CODE_START = `# Start maker daemon (uses default ~/.coinswap/maker/ data dir)
makerd

# Custom Bitcoin Core RPC endpoint
makerd -r 127.0.0.1:38332 -a user:password`

const CODE_DOCKER = `git clone ${LINKS.coinswap_docker}
cd coinswap-docker
./docker-setup configure
./docker-setup build
./docker-setup start

# Operate the maker inside docker
./docker-setup maker-cli send-ping
./docker-setup maker-cli get-balances`

const CODE_CLI_REF = `maker-cli send-ping              # Health check — returns "success"
maker-cli get-balances           # Balance by category
maker-cli get-new-address        # Deposit address
maker-cli show-fidelity          # Fidelity bond status + outpoint
maker-cli show-tor-address       # Your .onion address
maker-cli show-data-dir          # Data directory path
maker-cli list-utxo              # All UTXOs (including fidelity)
maker-cli list-utxo-swap         # UTXOs from completed swaps
maker-cli list-utxo-contract     # Locked HTLC UTXOs
maker-cli list-utxo-fidelity     # Fidelity bond UTXO
maker-cli sync-wallet            # Sync wallet with chain state
maker-cli send-to-address \\
  --address <addr> \\
  --amount <sats> \\
  --fee <sats>                   # Send funds
maker-cli stop                   # Graceful shutdown`

const CODE_CONFIG = `# ~/.coinswap/maker/config.toml (auto-created on first run)
network_port = 6102          # Coinswap protocol port (Tor hidden service)
rpc_port     = 6103          # maker-cli RPC port
socks_port   = 9050          # Tor SOCKS5 proxy
control_port = 9051          # Tor control port
tor_auth_password = ""

min_swap_amount = 10000      # sats — reject swaps below this
fidelity_amount = 50000      # sats locked in fidelity bond
fidelity_timelock = 13104    # blocks (~3 months)
connection_type = "TOR"      # TOR only in production

base_fee = 100               # fixed fee per swap (sats)
amount_relative_fee_pct = 0.1  # % of forwarded amount`

const CODE_STARTUP_LOG = `INFO coinswap::maker::api  - Wallet created. Backup the mnemonic:
["harvest","trust","catalog","degree","oxygen","business","crawl","enemy","hamster","music","this","idle"]

INFO coinswap::maker::server - No active Fidelity Bonds found. Creating one.
INFO coinswap::maker::server - Fund the wallet with at least 0.00051000 BTC at:
INFO coinswap::maker::server -   bcrt1q...

# After funding (~2 min block time on Mutinynet):
INFO coinswap::wallet::fidelity - Fidelity Transaction confirmed at blockheight: 229349
INFO coinswap::maker::server   - [6102] Server listening at <onion>.onion:6102
INFO coinswap::maker::server   - [6102] Server Setup completed!!`

// ─── Deployment tabs ──────────────────────────────────────────────────────────

const DEPLOY_TABS = [
  {
    label: 'Native Build',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          Build <code className="inline-code">makerd</code> and{' '}
          <code className="inline-code">maker-cli</code> from
          source. Requires Rust toolchain and a running Bitcoin Core node.
        </p>
        <CodeBlock code={CODE_BUILD} language="bash" />
        <CodeBlock code={CODE_START} language="bash" />
      </div>
    ),
  },
  {
    label: 'Docker (Recommended)',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          One-command stack: bitcoind + Tor + makerd, all pre-configured and connected.
          The setup script handles interactive configuration of ports, RPC, and Tor.
        </p>
        <CodeBlock code={CODE_DOCKER} language="bash" />
        <p className="type-meta text-cream/50 font-body">
          Repo:{' '}
          <a href={LINKS.coinswap_docker} target="_blank" rel="noopener noreferrer"
            className="simple-link">
            citadel-tech/coinswap-docker ↗
          </a>
        </p>
      </div>
    ),
  },
  {
    label: 'Maker Dashboard',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          A web interface to monitor balances, view swap history, and manage your node.
          Runs alongside a running <code className="inline-code">makerd</code> instance.
        </p>
        <a href={LINKS.maker_dashboard} target="_blank" rel="noopener noreferrer"
          className="type-small simple-link inline-flex items-center gap-2 px-0 py-0 font-body font-medium">
          citadel-tech/maker-dashboard ↗
        </a>
      </div>
    ),
  },
]

// ─── Balance types ────────────────────────────────────────────────────────────

const BALANCE_TYPES = [
  { type: 'regular',   desc: 'Seed wallet coins — fully spendable' },
  { type: 'swap',      desc: '2-of-2 multisig coins from completed swaps' },
  { type: 'contract',  desc: 'Timelocked HTLC outputs — in-flight swap contracts' },
  { type: 'fidelity',  desc: 'Bond coins — locked until timelock expires, not spendable' },
  { type: 'spendable', desc: 'regular + swap (excludes contract and fidelity)' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Makers() {
  return (
    <>
      <title>Makers — CoinSwap</title>
      <meta name="description" content="Run a CoinSwap maker node. Post a fidelity bond, register on the directory, and earn fees passively while strengthening Bitcoin privacy for everyone." />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">

        {/* ── Hero ── */}
        <section>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="orange">Live on Mutinynet</Badge>
            <Badge variant="amber">Mainnet: use with caution</Badge>
          </div>
          <h1 className="type-page-title font-display font-bold text-cream mb-3">
            Earn Fees. Strengthen Privacy.
          </h1>
          <p className="type-subtitle text-cream/60 font-body max-w-2xl">
            Run a maker node. Post a fidelity bond. Route swaps passively. You never touch user funds —
            the protocol is trustless by design.
          </p>
        </section>

        {/* ── What is a Maker ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-3">What is a Maker?</h2>
          <p className="type-body text-cream/70 font-body max-w-2xl mb-4">
            Makers are always-on servers that route coinswaps for takers and collect fees.
            They follow the <strong className="text-cream">smart-client-dumb-server</strong> model —
            the taker handles protocol coordination while makers act as lightweight daemons responding
            to requests. You lock Bitcoin in a <strong className="text-cream">fidelity bond</strong> to
            register with the directory, then your node runs passively: takers discover you, route
            swaps through you, and your balance grows.
          </p>
          <div className="inline-block border-l border-dotted border-black/20 pl-4">
            <p className="type-small text-cream font-body font-medium">
              The model is: <span className="text-cream">install → fund → forget.</span>
            </p>
          </div>
        </section>

        {/* ── Requirements ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Requirements</h2>
          <ul className="space-y-3">
            {[
              'A server with stable uptime (VPS or home server with reliable internet)',
              'Bitcoin Core synced on Mutinynet (custom signet) for testing, mainnet when stable',
              'Tor installed and running — all maker communication happens over .onion hidden services',
              <>
                <strong className="text-cream">~75,000 sats</strong> to start: 50,000 sats fidelity bond +
                1,000 sats bond tx fee + 10,000 sats minimum swap liquidity (suggest 0.001 BTC total)
              </>,
            ].map((item, i) => (
              <li key={i} className="type-small flex items-start gap-3 text-cream/70 font-body">
                <span className="type-meta mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/15 font-semibold text-cream">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Fidelity Bonds ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-3">How Fidelity Bonds Work</h2>
          <p className="type-body text-cream/70 font-body max-w-2xl mb-4">
            A fidelity bond is a Bitcoin UTXO time-locked for{' '}
            <code className="inline-code">fidelity_timelock</code>{' '}
            blocks (default ~3 months). The longer the lock and the larger the amount, the higher your
            <strong className="text-cream"> bond value</strong> — the reputation metric takers use to
            rank and select makers. Higher bond value = more swap traffic. Bonds raise the economic cost
            of Sybil attacks: faking a maker network requires real, locked capital.
          </p>
          <ul className="space-y-2">
            {[
              <><code className="inline-code">makerd</code> creates the fidelity bond automatically when the wallet is funded</>,
              <>Bond value decays as the timelock approaches expiry — <code className="inline-code">makerd</code> auto-renews before it drops too low</>,
              <><code className="inline-code">directoryd</code> verifies the fidelity proof before registering your <code className="inline-code">.onion</code> address</>,
              <>Expired bonds can be redeemed using <code className="inline-code">maker-cli</code></>,
            ].map((item, i) => (
              <li key={i} className="type-small flex items-start gap-3 text-cream/70 font-body">
                <span className="mt-0.5 shrink-0 text-cream">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Deployment ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">Deployment</h2>
          <TabGroup tabs={DEPLOY_TABS} />
        </section>

        {/* ── Startup process ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-3">Startup Process</h2>
          <p className="type-small text-cream/70 font-body mb-4">
            On first run, <code className="inline-code">makerd</code> creates
            a wallet, prints the mnemonic for backup, then waits for funding. Once you deposit coins, it
            automatically creates the fidelity bond transaction, waits for confirmation (~2 min on Mutinynet),
            and starts listening for swap requests.
          </p>
          <CodeBlock code={CODE_STARTUP_LOG} language="bash" />
          <p className="type-meta text-cream/40 font-body mt-2">
            Back up the mnemonic immediately — it's only shown once.
          </p>
        </section>

        {/* ── maker-cli Reference ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">
            <code className="font-mono text-cream text-2xl">maker-cli</code> Reference
          </h2>
          <p className="type-small text-cream/60 font-body mb-3">
            <code className="inline-code">maker-cli</code> is
            the RPC client for <code className="inline-code">makerd</code>.
            It only responds after the server has fully completed setup (fidelity bond confirmed).
          </p>
          <CodeBlock code={CODE_CLI_REF} language="bash" />
          <p className="text-cream/40 text-sm font-body mt-2">
            Default RPC port: <code className="font-mono">127.0.0.1:6103</code>. Override with <code className="font-mono">-p &lt;port&gt;</code>.
          </p>
        </section>

        {/* ── Balance Types ── */}
        <section className="border-t border-blue/20 pt-8">
          <h2 className="font-display text-2xl font-semibold text-cream mb-4">Balance Categories</h2>
          <div className="overflow-x-auto rounded-lg border border-blue/30">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-blue/30 bg-blue/10">
                  <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Description</th>
                </tr>
              </thead>
              <tbody>
                {BALANCE_TYPES.map(({ type, desc }) => (
                  <tr key={type} className="border-b border-blue/10 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <code className="inline-code">{type}</code>
                    </td>
                    <td className="px-4 py-3 text-cream/70">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Config ── */}
        <section className="border-t border-blue/20 pt-8">
          <h2 className="font-display text-2xl font-semibold text-cream mb-3">Config & Data</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Data directory', value: '~/.coinswap/maker/',    note: 'All maker state lives here' },
              { label: 'Wallet',         value: 'maker-wallet',           note: 'Encrypted — backup the mnemonic on first run' },
              { label: 'Network port',   value: ':6102',                  note: 'Coinswap protocol — exposed via Tor hidden service' },
            ].map(({ label, value, note }) => (
              <div key={label} className="rounded-lg border border-blue/30 bg-blue/5 p-4">
                <p className="text-cream/40 text-sm font-body uppercase tracking-widest mb-1">{label}</p>
                <p className="font-mono text-cream text-sm mb-1">{value}</p>
                <p className="text-cream/50 text-sm font-body">{note}</p>
              </div>
            ))}
          </div>
          <CodeBlock code={CODE_CONFIG} language="toml" />
        </section>

        {/* ── Mutinynet ── */}
        <section className="border-t border-blue/20 pt-8">
          <div className="border-t border-dotted border-black/15 pt-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl">⚡</span>
              <div>
                <h2 className="font-display text-xl font-semibold text-cream mb-2">
                  Test on Mutinynet (Signet)
                </h2>
                <p className="text-cream/70 font-body text-sm leading-relaxed mb-4">
                  Start on Mutinynet — the live coinswap marketplace on custom signet with ~2-min blocks.
                  Get test coins for your fidelity bond from the faucet. The marketplace is only accessible
                  on this network (mainnet has no directory yet).
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={LINKS.mutinynet} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-black/20 px-4 py-2 text-sm font-body font-medium text-cream transition-colors hover:bg-black/4">
                    Explorer ↗
                  </a>
                  <a href={LINKS.mutinynet_faucet} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-black/20 px-4 py-2 text-sm font-body font-medium text-cream transition-colors hover:bg-black/4">
                    Faucet ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer links ── */}
        <section className="border-t border-blue/20 pt-6 flex flex-wrap gap-4">
          {[
            { href: LINKS.maker_dashboard,   label: 'Maker Dashboard' },
            { href: LINKS.coinswap_docker,   label: 'Docker stack' },
            { href: LINKS.coinswap_repo,     label: 'Coinswap core repo' },
            { href: LINKS.issues,            label: 'Open an issue' },
          ].map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="text-blue-l hover:underline text-sm font-body">
              {label} ↗
            </a>
          ))}
        </section>
      </div>
    </>
  )
}
