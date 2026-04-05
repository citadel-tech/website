import { LINKS } from '../constants/links'
import CodeBlock from '../components/coinswap-ui/CodeBlock'
import TabGroup from '../components/coinswap-ui/TabGroup'
import TerminalWindow from '../components/coinswap-ui/TerminalWindow'

// ─── Code snippets ────────────────────────────────────────────────────────────

const CODE_BUILD = `git clone ${LINKS.coinswap_repo}
cd coinswap
cargo build --release --bin makerd --bin maker-cli
sudo install ./target/release/makerd /usr/local/bin/
sudo install ./target/release/maker-cli /usr/local/bin/`

const CODE_MAKERD_HELP = `$ makerd --help
CoinSwap Maker Server

The server requires a Bitcoin Core RPC connection running in Testnet4. It requires some
starting balance, around 50,000 sats for Fidelity + Swap Liquidity (suggested 50,000 sats).
So top up with at least 0.001 BTC to start all the node processes. Suggested faucet here:
https://mempool.space/testnet4/faucet

All server processes will start after the fidelity bond transaction is confirmed. This may
take some time. Approximately 10 minutes. Once the bond is confirmed, the server starts listening
for incoming swap requests. As it performs swaps for clients, it keeps earning fees.

The server is operated with the maker-cli app, for all basic wallet related operations.

For more detailed usage information, please refer to the Maker docs:
https://github.com/citadel-tech/coinswap/blob/master/docs/makerd.md

This is an early beta, and there are known and unknown bugs. Please report issues in the
Project Issue Board: https://github.com/citadel-tech/coinswap/issues

USAGE:
    makerd [OPTIONS]

OPTIONS:
    -d, --data-directory <DATA_DIRECTORY>  Data directory
                                           [default: ~/.coinswap/maker]
    -r, --ADDRESS:PORT <ADDRESS:PORT>      Bitcoin Core RPC address
                                           [default: 127.0.0.1:38332]
    -z, --ZMQ <ZMQ>                        Bitcoin Core ZMQ address:port value
                                           [default: tcp://127.0.0.1:28332]
    -a, --USER:PASSWORD <USER:PASSWORD>    Bitcoin Core RPC authentication string
                                           [default: user:password]
    -t, --tor-auth <TOR_AUTH>
    -w, --WALLET <WALLET>                  Optional wallet name. If the wallet exists,
                                           load the wallet, else create a new wallet with
                                           the given name. Default: maker-wallet
    -p, --PASSWORD <PASSWORD>              Optional Password for the encryption of the wallet
    -h, --help                             Print help information
    -V, --version                          Print version`

const CODE_START = `# Start with defaults
makerd

# Custom Bitcoin Core RPC
makerd -r 127.0.0.1:38332 -a user:password`

const CODE_STARTUP_LOG = `INFO coinswap::wallet::api - Backup the Wallet Mnemonics:
["harvest","trust","catalog","degree","oxygen","business","crawl","enemy","hamster","music","this","idle"]

INFO coinswap::maker::server - No active Fidelity Bonds found. Creating one.
INFO coinswap::maker::server - Fidelity value chosen = 0.0005 BTC, Tx fee = 1000 sats
INFO coinswap::maker::server - Fund the wallet at: bcrt1q...

# After funding (confirm on chain):
INFO coinswap::wallet::fidelity - Fidelity Transaction confirmed at blockheight: 229349
INFO coinswap::maker::server  - [6102] Server listening at <onion>.onion:6102
INFO coinswap::maker::server  - [6102] Server Setup completed!!
INFO coinswap::maker::server  - Swap Liquidity: 950000 sats | Min: 10000 sats | Listening for requests.`

const CODE_DOCKER = `git clone ${LINKS.coinswap_repo}
cd coinswap

# Interactive setup — choose your Bitcoin + Tor mode
./docker-setup configure

# Build the coinswap image
./docker-setup build

# (Only needed if using Docker-managed Bitcoin)
./docker-setup build-bitcoin

# Start
./docker-setup start`

const CODE_DOCKER_CLI = `# Control the maker via Docker
./docker-setup maker-cli send-ping
./docker-setup maker-cli get-balances
./docker-setup maker-cli show-fidelity
./docker-setup maker-cli show-tor-address`

const CODE_DASHBOARD = `git clone ${LINKS.maker_dashboard}
cd maker-dashboard
make build
make run
# Web UI at http://127.0.0.1:3000`

const CODE_MAKER_CLI_HELP = `$ maker-cli --help
A simple command-line app for operating the makerd server.

USAGE:
    maker-cli [OPTIONS] <SUBCOMMAND>

OPTIONS:
    -p, --rpc-port <RPC_PORT>    RPC port of makerd  [default: 127.0.0.1:6103]

SUBCOMMANDS:
    send-ping            Health check — returns "success"
    get-balances         Balance by category (regular, swap, contract, fidelity, spendable)
    get-new-address      Generate a deposit address
    show-fidelity        Fidelity bond status, outpoint, and value
    show-tor-address     Your .onion address
    show-data-dir        Data directory path
    list-utxo            All UTXOs including fidelity
    list-utxo-swap       UTXOs from completed swaps
    list-utxo-contract   Locked HTLC UTXOs
    list-utxo-fidelity   Fidelity bond UTXO
    sync-wallet          Sync wallet with chain state
    send-to-address      Send funds to an external address
    stop                 Graceful shutdown`

// ─── Docker config modes ──────────────────────────────────────────────────────

const DOCKER_MODES = [
  { bitcoin: 'Docker',      tor: 'Docker',      label: 'Full Docker',    desc: 'Everything containerized — fastest path to running' },
  { bitcoin: 'Your node',   tor: 'Docker',      label: 'Native Bitcoin', desc: 'Reuse your existing bitcoind; Docker provides Tor' },
  { bitcoin: 'Docker',      tor: 'Your daemon', label: 'Native Tor',     desc: 'Docker provides Bitcoin; reuse your existing Tor' },
  { bitcoin: 'Your node',   tor: 'Your daemon', label: 'Native Both',    desc: 'Docker runs only makerd; all deps are native' },
]

// ─── Deploy tabs ──────────────────────────────────────────────────────────────

const DEPLOY_TABS = [
  {
    label: 'Docker (Recommended)',
    content: (
      <div className="space-y-5">
        <p className="type-small text-cream/70 font-body">
          The <code className="inline-code">./docker-setup configure</code> script detects your
          existing services and lets you mix native and containerized components. Configuration is
          saved to <code className="inline-code">.docker-config</code> and reused on subsequent runs.
        </p>

        <div className="overflow-x-auto">
          <table className="simple-table text-sm font-body">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Mode</th>
                <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Bitcoin Core</th>
                <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Tor</th>
                <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Description</th>
              </tr>
            </thead>
            <tbody>
              {DOCKER_MODES.map(({ label, bitcoin, tor, desc }) => (
                <tr key={label}>
                  <td className="px-4 py-3 font-medium text-cream whitespace-nowrap">{label}</td>
                  <td className="px-4 py-3"><code className="inline-code">{bitcoin}</code></td>
                  <td className="px-4 py-3"><code className="inline-code">{tor}</code></td>
                  <td className="px-4 py-3 text-cream/70">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <p className="type-meta text-cream/50 font-body uppercase tracking-widest mb-2">Setup & start</p>
          <CodeBlock code={CODE_DOCKER} language="bash" />
        </div>
        <div>
          <p className="type-meta text-cream/50 font-body uppercase tracking-widest mb-2">Operate via Docker</p>
          <CodeBlock code={CODE_DOCKER_CLI} language="bash" />
        </div>
        <p className="type-meta text-cream/50 font-body">
          Docs:{' '}
          <a href={LINKS.maker_docker_docs} target="_blank" rel="noopener noreferrer" className="simple-link">
            docs/docker.md ↗
          </a>
        </p>
      </div>
    ),
  },
  {
    label: 'Native Build',
    content: (
      <div className="space-y-5">
        <p className="type-small text-cream/70 font-body">
          Build <code className="inline-code">makerd</code> and{' '}
          <code className="inline-code">maker-cli</code> from source. Requires a Rust toolchain
          and a running Bitcoin Core node.
        </p>
        <div>
          <p className="type-meta text-cream/50 font-body uppercase tracking-widest mb-2">Step 1 — Clone & build</p>
          <CodeBlock code={CODE_BUILD} language="bash" />
        </div>
        <div>
          <p className="type-meta text-cream/50 font-body uppercase tracking-widest mb-2">Step 2 — Verify</p>
          <CodeBlock code={CODE_MAKERD_HELP} language="text" />
        </div>
        <div>
          <p className="type-meta text-cream/50 font-body uppercase tracking-widest mb-2">Step 3 — Start</p>
          <CodeBlock code={CODE_START} language="bash" />
        </div>
        <p className="type-meta text-cream/50 font-body">
          Docs:{' '}
          <a href={LINKS.makerd_docs} target="_blank" rel="noopener noreferrer" className="simple-link">
            docs/makerd.md ↗
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
          A browser-based UI for monitoring balances, swap history, and managing your node.
          Runs alongside a live <code className="inline-code">makerd</code> instance and connects
          to its RPC port (<code className="inline-code">127.0.0.1:6103</code>).
        </p>
        <CodeBlock code={CODE_DASHBOARD} language="bash" />
        <p className="type-meta text-cream/50 font-body">
          Repo:{' '}
          <a href={LINKS.maker_dashboard} target="_blank" rel="noopener noreferrer" className="simple-link">
            citadel-tech/maker-dashboard ↗
          </a>
        </p>
      </div>
    ),
  },
]

// ─── maker-cli subcommands ────────────────────────────────────────────────────

const SUBCOMMANDS = [
  { cmd: 'send-ping',          desc: 'Health check — returns "success" when server is ready' },
  { cmd: 'get-balances',       desc: 'Balance by category (regular, swap, contract, fidelity, spendable)' },
  { cmd: 'get-new-address',    desc: 'Generate a deposit address' },
  { cmd: 'show-fidelity',      desc: 'Fidelity bond status, outpoint, amount, and value' },
  { cmd: 'show-tor-address',   desc: 'Your .onion address as seen by takers' },
  { cmd: 'show-data-dir',      desc: 'Data directory path' },
  { cmd: 'list-utxo',          desc: 'All UTXOs including fidelity bond' },
  { cmd: 'list-utxo-swap',     desc: 'UTXOs received from completed swaps' },
  { cmd: 'list-utxo-contract', desc: 'Locked HTLC UTXOs from in-flight swaps' },
  { cmd: 'list-utxo-fidelity', desc: 'Fidelity bond UTXO' },
  { cmd: 'sync-wallet',        desc: 'Sync wallet with current chain state' },
  { cmd: 'send-to-address',    desc: 'Send funds to an external address' },
  { cmd: 'stop',               desc: 'Graceful shutdown of makerd' },
]

// ─── Balance categories ───────────────────────────────────────────────────────

const BALANCE_TYPES = [
  { type: 'regular',   desc: 'Seed wallet coins — single-sig, fully spendable' },
  { type: 'swap',      desc: '2-of-2 multisig coins received from completed swaps' },
  { type: 'contract',  desc: 'Timelocked HTLC outputs from in-flight swaps' },
  { type: 'fidelity',  desc: 'Bond coins — timelocked, not spendable until expiry' },
  { type: 'spendable', desc: 'regular + swap (excludes contract and fidelity)' },
]

// ─── Maker Dashboard screenshots ─────────────────────────────────────────────

const DASHBOARD_SHOTS = [
  { src: `${import.meta.env.BASE_URL}maker-db-1.png`, caption: 'maker-db-1.png — dashboard overview' },
  { src: `${import.meta.env.BASE_URL}maker-db-2.png`, caption: 'maker-db-2.png — balances and status' },
  { src: `${import.meta.env.BASE_URL}maker-db-3.png`, caption: 'maker-db-3.png — swap activity' },
  { src: `${import.meta.env.BASE_URL}maker-db-4.png`, caption: 'maker-db-4.png — node management' },
]

// ─── What is a Maker cards ────────────────────────────────────────────────────

const MAKER_CARDS = [
  {
    label: 'Earn Passively',
    heading: 'Collect fees on every swap routed through you',
    body: 'Makers earn a fixed base_fee plus a percentage of each swap amount they forward. No interaction required — takers discover you automatically and pay fees directly. Your balance grows as the network grows.',
  },
  {
    label: 'Lock Liquidity',
    heading: 'Commit capital to unlock swap traffic',
    body: 'You post a fidelity bond (~50,000 sats, timelocked ~3 months) and keep swap liquidity in your wallet. More capital locked = higher bond value = more takers choose your node. The locked capital is always yours — it just cannot be spent until the timelock expires.',
  },
  {
    label: 'Backbone of the Market',
    heading: 'Every hop in every swap routes through a maker',
    body: 'Makers are the infrastructure CoinSwap runs on. No active management needed — makerd handles bond creation, renewal, and directory registration automatically. More makers mean stronger privacy guarantees for everyone.',
  },
]

// ─── Bond value factors ───────────────────────────────────────────────────────

const BOND_FACTORS = [
  { factor: 'Larger locked amount',                effect: 'Higher bond value' },
  { factor: 'Longer remaining locktime',           effect: 'Higher bond value' },
  { factor: 'Approaching expiry',                  effect: 'Value decays toward zero' },
  { factor: 'One strong bond vs. many small ones', effect: 'Concentrated capital ranks higher' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Makers() {
  return (
    <>
      <title>Makers — CoinSwap</title>
      <meta name="description" content="Run a CoinSwap maker node. Post a fidelity bond, earn fees passively on every swap routed through you, and strengthen Bitcoin privacy without active maintenance." />

      <div className="site-shell py-12 md:py-16 space-y-12 md:space-y-16">

        {/* ── Fancy Hero ── */}
        <section className="relative flex flex-col lg:flex-row-reverse items-center gap-10 mt-10 mb-16">
          <div className="flex-1 z-10 lg:pl-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass-panel border-orange/30 text-orange type-caption font-mono animate-pulse-glow">
              <span className="w-2 h-2 rounded-full bg-orange animate-ping"></span>
              v0.4 Maker Node
            </div>
            <h1 className="type-page-title font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream via-cream to-orange drop-shadow-[0_0_15px_rgba(255,94,0,0.3)] mb-4">
              Earn Fees. Strengthen Privacy.
            </h1>
            <p className="type-subtitle text-cream/70 font-body max-w-2xl leading-relaxed mb-8">
              Become the backbone of the CoinSwap protocol. Run a maker node, post a fidelity bond, and route swaps completely passively. You never touch user funds — the protocol is trustless by design. Your node earns while you sleep.
            </p>
            <div className="flex gap-4">
              <a href="#install" className="inline-flex items-center justify-center px-6 py-3 font-mono text-sm font-bold text-white bg-orange rounded-lg shadow-[0_0_0_1px_rgba(255,94,0,0.4),0_8px_32px_rgba(255,94,0,0.2)] hover:shadow-[0_0_40px_rgba(255,94,0,0.45)] transition-all hover:-translate-y-0.5">BECOME A MAKER</a>
            </div>
          </div>
          <div className="flex-1 w-full relative z-10">
            <div className="absolute -inset-10 bg-gradient-to-br from-orange/20 via-transparent to-transparent blur-3xl opacity-50 rounded-full"></div>
            <TerminalWindow accent="orange" commands={[
              { type: 'input', text: 'makerd' },
              { type: 'info', text: 'Initializing Maker Server...', delay: 300 },
              { type: 'success', text: 'Fidelity Bond Transaction confirmed: 4x2b...9a' },
              { type: 'info', text: 'Binding to Tor Onion Hidden Service...' },
              { type: 'success', text: 'Node reachable at: xyz123...onion:6102' },
              { type: 'input', text: 'maker-cli get-balances' },
              { type: 'info', text: 'Fetching balances...', delay: 200 },
              { type: 'success', text: 'Fidelity Bond: 50,000 sats' },
              { type: 'success', text: 'Swap Liquidity: 3,500,000 sats' },
              { type: 'info', text: 'Waiting for swap requests...' }
            ]} title="MAKERD SERVER" />
          </div>
        </section>

        {/* ── What is a Maker ── */}
        <section className="section-rule relative z-10">
          <p className="section-label mb-3 text-orange">// Role Definition</p>
          <h2 className="type-section-title font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cream to-cream/70 mb-6 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">What is a Maker?</h2>
          <div className="grid gap-6 lg:grid-cols-3 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent -translate-y-1/2 pointer-events-none hidden lg:block"></div>
            {MAKER_CARDS.map(({ label, heading, body }, i) => (
              <div key={label} className="glass-panel p-6 hover:-translate-y-2 hover:border-orange/50 hover:shadow-[0_0_25px_rgba(255,94,0,0.2)] transition-all duration-300 animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center border border-orange/30 mb-4 shadow-[0_0_15px_rgba(255,94,0,0.2)]">
                  <span className="text-orange font-mono font-bold">{i+1}</span>
                </div>
                <p className="type-caption mb-3 font-mono uppercase tracking-[0.18em] text-orange/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></span>
                  {label}
                </p>
                <h3 className="type-card-title mb-3 font-display font-semibold text-cream drop-shadow-[0_0_4px_rgba(255,255,255,0.1)]">{heading}</h3>
                <p className="type-small font-body text-cream/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── No Active Maintenance ── */}
        <section className="section-rule">
          <div className="border border-dotted border-cream/20 bg-cream/[0.02] p-5">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-green/70 mb-2">Install → Fund → Forget</p>
            <p className="type-body font-body text-cream/75">
              <code className="inline-code">makerd</code> handles everything automatically: wallet
              creation, fidelity bond creation and renewal, directory registration, and swap routing.
              Once running, it listens for swap requests around the clock with no intervention required.
            </p>
          </div>
        </section>

        {/* ── Fidelity Bonds ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// Sybil Resistance</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Fidelity Bonds</h2>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.9fr)] lg:items-start">
            <div>
              <p className="type-body text-cream/70 font-body max-w-2xl mb-5">
                A fidelity bond is a Bitcoin UTXO time-locked for{' '}
                <code className="inline-code">fidelity_timelock</code> blocks (default 13,104 ≈ 3 months).
                Takers rank makers by bond value — the higher your value, the more swap traffic routes
                through you. Bonds make Sybil attacks expensive: faking multiple maker identities requires
                real locked capital behind each one.
              </p>

              <div className="space-y-2">
                {[
                  <><code className="inline-code">makerd</code> creates the bond automatically once the wallet is funded</>,
                  <>Bond value decays as expiry approaches — <code className="inline-code">makerd</code> auto-renews before it drops too low</>,
                  <><code className="inline-code">directoryd</code> verifies the fidelity proof before listing your <code className="inline-code">.onion</code> address</>,
                  <>Expired bonds are redeemed and a new bond is created automatically</>,
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-cream font-mono">→</span>
                    <p className="type-small font-body text-cream/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="simple-table text-sm font-body">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Factor</th>
                    <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {BOND_FACTORS.map(({ factor, effect }) => (
                    <tr key={factor}>
                      <td className="px-4 py-3 text-cream/70">{factor}</td>
                      <td className="px-4 py-3 text-cream/70">{effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Choose Your Method ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// Get Started</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">Choose Your Method</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-dotted border-cream/20 bg-cream/[0.02] p-5 flex flex-col">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-green/70 mb-2">[ DOCKER ]</p>
              <h3 className="font-display text-xl font-semibold text-cream mb-2">Full Stack</h3>
              <p className="type-small font-body text-cream/68 mb-4 flex-1">
                Pre-configured bitcoind + Tor + makerd. Mix native and Docker services to match
                your existing setup. Recommended for new operators.
              </p>
              <p className="type-meta text-cream/45 font-mono">./docker-setup configure</p>
            </div>
            <div className="border border-dotted border-cream/20 bg-cream/[0.02] p-5 flex flex-col">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-orange/70 mb-2">[ NATIVE ]</p>
              <h3 className="font-display text-xl font-semibold text-cream mb-2">From Source</h3>
              <p className="type-small font-body text-cream/68 mb-4 flex-1">
                Build <code className="inline-code">makerd</code> and{' '}
                <code className="inline-code">maker-cli</code> with cargo.
                Full control, system-wide binaries, no Docker dependency.
              </p>
              <p className="type-meta text-cream/45 font-mono">cargo build --release</p>
            </div>
            <div className="border border-dotted border-cream/20 bg-cream/[0.02] p-5 flex flex-col">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-blue-l/70 mb-2">[ DASHBOARD ]</p>
              <h3 className="font-display text-xl font-semibold text-cream mb-2">Web UI</h3>
              <p className="type-small font-body text-cream/68 mb-4 flex-1">
                Browser-based interface for monitoring balances, swap history, and node management.
                Runs alongside a live <code className="inline-code">makerd</code> instance.
              </p>
              <p className="type-meta text-cream/45 font-mono">make build &amp;&amp; make run</p>
            </div>
          </div>
        </section>

        {/* ── Prerequisites ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Prerequisites</h2>
          <ul className="space-y-3">
            {[
              <>
                <strong className="text-cream">Bitcoin Core</strong> running on{' '}
                <a href={LINKS.mutinynet} target="_blank" rel="noopener noreferrer" className="simple-link">Mutinynet</a>
                {' '}(custom signet) for testing — synced, non-pruned,{' '}
                <code className="inline-code">-txindex</code> enabled
              </>,
              <>
                <strong className="text-cream">Tor</strong> running locally — all maker communication
                happens over <code className="inline-code">.onion</code> hidden services via SOCKS5.{' '}
                <a href={LINKS.tor_docs} target="_blank" rel="noopener noreferrer" className="simple-link">
                  Setup guide ↗
                </a>
              </>,
              <>
                <strong className="text-cream">~75,000+ sats</strong> to start: 50,000 sats fidelity
                bond + 1,000 sats bond tx fee + swap liquidity. Suggest funding with at least 0.001 BTC.
              </>,
              'Rust toolchain (cargo) — native build path only',
            ].map((item, i) => (
              <li key={i} className="type-small flex items-start gap-3 text-cream/70 font-body">
                <span className="type-meta mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cream/15 font-semibold text-cream">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Management Options ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">Setup &amp; Management</h2>
          <TabGroup tabs={DEPLOY_TABS} />
        </section>

        {/* ── Maker Dashboard Screenshots ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// Web UI</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-2">Maker Dashboard</h2>
          <p className="type-small text-cream/60 font-body mb-5">
            A browser-based dashboard for tracking balances, swap history, fidelity bond state,
            and node status while <code className="inline-code">makerd</code> is running.{' '}
            <a href={LINKS.maker_dashboard} target="_blank" rel="noopener noreferrer" className="simple-link">
              citadel-tech/maker-dashboard ↗
            </a>
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {DASHBOARD_SHOTS.map(({ src, caption }) => (
              <div key={caption} className="border border-dotted border-cream/15 bg-cream/30 rounded overflow-hidden">
                <img
                  src={src}
                  alt={caption}
                  className="w-full block"
                  loading="lazy"
                />
                <p className="type-caption font-mono text-cream/35 px-3 py-2">{caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Startup Process ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// Startup Process</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-3">Makerd Startup</h2>
          <p className="type-small text-cream/70 font-body mb-4">
            On first run, <code className="inline-code">makerd</code> creates a wallet and prints
            the mnemonic. Once you fund the address it provides, it automatically creates the
            fidelity bond, waits for confirmation, then starts listening for swap requests.
          </p>
          <CodeBlock code={CODE_STARTUP_LOG} language="bash" />
          <p className="type-meta text-cream/40 font-body mt-2">
            Back up the mnemonic immediately — it is only shown once.
          </p>
        </section>

        {/* ── makerd & maker-cli Reference ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">
            makerd &amp; maker-cli Reference
          </h2>

          <div className="mb-6">
            <p className="section-label mb-3">// makerd help</p>
            <CodeBlock code={CODE_MAKERD_HELP} language="text" />
            <p className="type-meta text-cream/40 font-body mt-2">
              Full docs:{' '}
              <a href={LINKS.makerd_docs} target="_blank" rel="noopener noreferrer" className="simple-link">
                docs/makerd.md ↗
              </a>
            </p>
          </div>

          <div>
            <p className="section-label mb-3">// maker-cli commands</p>
            <CodeBlock code={CODE_MAKER_CLI_HELP} language="text" />
            <div className="overflow-x-auto mt-4">
              <table className="simple-table text-sm font-body">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Subcommand</th>
                    <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBCOMMANDS.map(({ cmd, desc }) => (
                    <tr key={cmd}>
                      <td className="px-4 py-3">
                        <code className="inline-code whitespace-nowrap">{cmd}</code>
                      </td>
                      <td className="px-4 py-3 text-cream/70">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="type-meta text-cream/40 font-body mt-2">
              RPC port default: <code className="inline-code">127.0.0.1:6103</code>. Override with{' '}
              <code className="inline-code">-p &lt;port&gt;</code>.{' '}
              Full docs:{' '}
              <a href={LINKS.maker_cli_docs} target="_blank" rel="noopener noreferrer" className="simple-link">
                docs/maker-cli.md ↗
              </a>
            </p>
          </div>
        </section>

        {/* ── Balance Categories ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Balance Categories</h2>
          <div className="overflow-x-auto">
            <table className="simple-table text-sm font-body">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase">Description</th>
                </tr>
              </thead>
              <tbody>
                {BALANCE_TYPES.map(({ type, desc }) => (
                  <tr key={type}>
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

        {/* ── Test on Mutinynet ── */}
        <section className="section-rule">
          <div className="flex items-start gap-4">
            <span className="text-2xl">⚡</span>
            <div>
              <h2 className="font-display text-xl font-semibold text-cream mb-2">
                Test on Mutinynet (Signet)
              </h2>
              <p className="text-cream/70 font-body text-sm leading-relaxed mb-4">
                Start on Mutinynet — the live CoinSwap marketplace on custom signet with ~2-minute blocks.
                Get test coins from the faucet to fund your fidelity bond and start routing swaps.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={LINKS.mutinynet} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-cream/20 px-4 py-2 text-sm font-body font-medium text-cream transition-colors hover:bg-cream/4">
                  Explorer ↗
                </a>
                <a href={LINKS.mutinynet_faucet} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-cream/20 px-4 py-2 text-sm font-body font-medium text-cream transition-colors hover:bg-cream/4">
                  Faucet ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer links ── */}
        <section className="section-rule flex flex-wrap gap-4">
          {[
            { href: LINKS.maker_dashboard,   label: 'Maker Dashboard' },
            { href: LINKS.makerd_docs,       label: 'makerd docs' },
            { href: LINKS.maker_cli_docs,    label: 'maker-cli docs' },
            { href: LINKS.maker_docker_docs, label: 'Docker docs' },
            { href: LINKS.coinswap_repo,     label: 'CoinSwap core' },
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
