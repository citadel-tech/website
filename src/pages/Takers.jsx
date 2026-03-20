import { LINKS } from '../constants/links'
import CodeBlock from '../components/ui/CodeBlock'
import TabGroup from '../components/ui/TabGroup'
import Badge from '../components/ui/Badge'

// ─── CLI snippets ─────────────────────────────────────────────────────────────

const CODE_CLI_BUILD = `git clone ${LINKS.coinswap_repo}
cd coinswap
cargo build --release
# installs: taker, makerd, maker-cli, directoryd`

const CODE_CLI_INSTALL = `sudo install ./target/release/taker /usr/local/bin/`

const CODE_CLI_USAGE = `# See all available commands
taker --help

# Get a receiving address to fund your wallet
taker get-new-address

# Check wallet balance
taker get-balances

# Discover available makers and their offers
taker fetch-offers

# Initiate a coinswap (uses config defaults)
taker coinswap

# Monitor swap progress in real time
tail -f ~/.coinswap/taker/debug.log`

const CODE_CLI_RECOVER = `# List funds locked in failed swap contracts
taker list-utxo-contract

# Recover timelocked funds from failed swaps
taker recover`

const CODE_GUI = `git clone ${LINKS.taker_app}
cd taker-app
npm install
npm run build`

const CODE_DOCKER = `git clone ${LINKS.coinswap_docker}
cd coinswap-docker
./docker-setup configure
./docker-setup build
./docker-setup start`

const CODE_CONFIG = `# ~/.coinswap/taker/config.toml (auto-created on first run)
control_port = 9051       # Tor control port
socks_port   = 9050       # Tor SOCKS5 proxy port
tor_auth_password = ""
connection_type = "TOR"   # Clearnet not supported in production`

const CODE_BITCOIN_CONF = `# ~/.bitcoin/bitcoin.conf — Mutinynet (custom signet)
signet=1

[signet]
server=1
txindex=1
rpcuser=user
rpcpassword=password
fallbackfee=0.00001000
blockfilterindex=1
addnode=172.81.178.3:38333
signetchallenge=0014c9e9f8875a25c3cc6d99ad3e5fd54254d00fed44`

// ─── Install tabs ─────────────────────────────────────────────────────────────

const INSTALL_TABS = [
  {
    label: 'CLI (from source)',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          Build the <code className="inline-code">taker</code> binary
          from the main repo. Requires a Rust toolchain and Bitcoin Core.
        </p>
        <CodeBlock code={CODE_CLI_BUILD} language="bash" />
        <p className="type-small text-cream/70 font-body">Optionally install system-wide:</p>
        <CodeBlock code={CODE_CLI_INSTALL} language="bash" />
        <p className="type-small text-cream/70 font-body">Run swaps:</p>
        <CodeBlock code={CODE_CLI_USAGE} language="bash" />
      </div>
    ),
  },
  {
    label: 'Desktop GUI',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          The Taker App is an Electron desktop application — the easiest way to get started.
          No terminal required.
        </p>
        <CodeBlock code={CODE_GUI} language="bash" />
        <p className="type-meta text-cream/50 font-body">
          Repo:{' '}
          <a href={LINKS.taker_app} target="_blank" rel="noopener noreferrer"
            className="simple-link">
            citadel-tech/taker-app ↗
          </a>
        </p>
      </div>
    ),
  },
  {
    label: 'Docker',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          Pre-configured stack with bitcoind, Tor, and taker — fastest path to running without
          installing Rust or configuring Bitcoin Core manually.
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
]

// ─── Balance categories ───────────────────────────────────────────────────────

const BALANCE_TYPES = [
  { type: 'regular',   desc: 'Single-signature seed wallet coins — fully spendable' },
  { type: 'swap',      desc: '2-of-2 multisig coins received in completed swaps' },
  { type: 'contract',  desc: 'Timelocked HTLC outputs from in-flight or failed swaps — use recover' },
  { type: 'spendable', desc: 'regular + swap combined' },
]

// ─── Taker subcommands ────────────────────────────────────────────────────────

const SUBCOMMANDS = [
  { cmd: 'get-new-address',   desc: 'Generate a receiving address to fund your wallet' },
  { cmd: 'get-balances',      desc: 'Show balance by category (regular, swap, contract, spendable)' },
  { cmd: 'fetch-offers',      desc: 'Sync the offer book with current maker offers' },
  { cmd: 'coinswap',          desc: 'Initiate a coinswap with available makers' },
  { cmd: 'list-utxo',         desc: 'List all UTXOs with type and spend info' },
  { cmd: 'list-utxo-regular', desc: 'Regular (non-swap) wallet UTXOs only' },
  { cmd: 'list-utxo-swap',    desc: 'UTXOs received from completed swaps' },
  { cmd: 'list-utxo-contract',desc: 'Timelocked HTLCs — run recover if non-empty' },
  { cmd: 'recover',           desc: 'Claim funds from all failed or timed-out swaps' },
  { cmd: 'send-to-address',   desc: 'Send sats to an external address' },
]

// ─── Fee table ────────────────────────────────────────────────────────────────

const FEES = [
  { participant: 'Maker 1', received: '500,000', forwarded: '463,500', fee: '33,500', mining: '3,000', total: '36,500', highlight: false },
  { participant: 'Maker 2', received: '463,500', forwarded: '438,642', fee: '21,858', mining: '3,000', total: '24,858', highlight: false },
  { participant: 'You',     received: '—',        forwarded: '438,642', fee: '—',      mining: '—',     total: '~61,358', highlight: true },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Takers() {
  return (
    <>
      <title>Takers — CoinSwap</title>
      <meta name="description" content="Run a coinswap as a taker. Install the taker CLI or desktop GUI, configure your swap parameters, and receive clean UTXOs with no on-chain history." />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">

        {/* ── Hero ── */}
        <section>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="orange">Live on Mutinynet</Badge>
            <Badge variant="amber">Mainnet: use with caution</Badge>
          </div>
          <h1 className="type-page-title font-display font-bold text-cream mb-3">
            Swap Bitcoin Privately
          </h1>
          <p className="type-subtitle text-cream/60 font-body max-w-2xl">
            You send one set of coins. You receive a different set with no shared on-chain history.
            No custodian, no mixer, no trust required.
          </p>
        </section>

        {/* ── What is a Taker ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-3">What is a Taker?</h2>
          <p className="type-body text-cream/70 font-body max-w-2xl">
            You are the <strong className="text-cream font-semibold">taker</strong> when you initiate a coinswap.
            You choose how much to swap and how many makers (hops) to route through. The protocol routes your
            coins through independent makers in a cyclic flow — each hop independently breaks the transaction
            trail. You pay a small fee to each maker; in return you receive a clean UTXO with no on-chain
            connection to your original funds.
          </p>
        </section>

        {/* ── Prerequisites ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Prerequisites</h2>
          <ul className="space-y-3 mb-6">
            {[
              <>
                <strong className="text-cream">Bitcoin Core</strong> running on{' '}
                <a href={LINKS.mutinynet} target="_blank" rel="noopener noreferrer" className="simple-link">Mutinynet</a>
                {' '}(custom signet) for testing, or mainnet when stable
              </>,
              <>
                <strong className="text-cream">Tor</strong> running locally — the taker connects to maker{' '}
                <code className="inline-code">.onion</code>
                {' '}addresses via SOCKS5 proxy at <code className="inline-code">127.0.0.1:9050</code>.{' '}
                <strong className="text-cream">Tor is not optional in production.</strong>
              </>,
              'Rust toolchain (cargo) — only needed for the CLI build path',
            ].map((item, i) => (
              <li key={i} className="type-small flex items-start gap-3 text-cream/70 font-body">
                <span className="type-meta mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/15 font-semibold text-cream">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="type-small text-cream/60 font-body mb-2">Mutinynet bitcoin.conf:</p>
          <CodeBlock code={CODE_BITCOIN_CONF} language="ini" />
        </section>

        {/* ── Installation ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">Installation</h2>
          <TabGroup tabs={INSTALL_TABS} />
        </section>

        {/* ── Taker subcommands ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Command Reference</h2>
          <div className="overflow-x-auto">
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
            Pass <code className="font-mono">-r 127.0.0.1:38332 -a user:password</code> if using non-default Bitcoin Core RPC settings.
          </p>
        </section>

        {/* ── Balance categories ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Balance Categories</h2>
          <div className="overflow-x-auto mb-3">
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
          <div className="border-t border-dotted border-black/15 pt-4">
            <p className="type-meta text-cream/50 font-body font-medium uppercase tracking-widest mb-2">If contract balance is non-zero</p>
            <p className="type-small text-cream/70 font-body mb-3">
              A non-zero <code className="inline-code">contract</code> balance means funds are locked in timelocked HTLC outputs from a failed or in-progress swap. Run <code className="inline-code">taker recover</code> to claim them back.
            </p>
            <CodeBlock code={CODE_CLI_RECOVER} language="bash" />
          </div>
        </section>

        {/* ── Fee Expectations ── */}
        <section className="border-t border-blue/20 pt-8">
          <h2 className="font-display text-2xl font-semibold text-cream mb-2">Fee Expectations</h2>
          <p className="text-cream/60 font-body text-sm mb-4">
            Example: 2 makers, 3 tx splits, 500,000 sat input. Each maker sets their own{' '}
            <code className="inline-code">base_fee</code> and{' '}
            <code className="inline-code">amount_relative_fee_pct</code>.
          </p>
          <div className="overflow-x-auto rounded-lg border border-blue/30">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-blue/30 bg-blue/10">
                  {['Participant', 'Received (sat)', 'Forwarded (sat)', 'Fee (sat)', 'Mining (sat)', 'Total cost'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-cream/50 font-medium tracking-wide text-sm uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEES.map(({ participant, received, forwarded, fee, mining, total, highlight }) => (
                  <tr key={participant}
                    className={`border-b border-blue/10 last:border-0 transition-colors ${
                      highlight ? 'bg-black text-[#f7f2e8] font-semibold' : 'text-cream/70 hover:bg-white/2'
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{participant}</td>
                    <td className="px-4 py-3 font-mono text-sm">{received}</td>
                    <td className={`px-4 py-3 font-mono text-sm ${highlight ? 'text-[#f7f2e8]' : 'text-cream'}`}>{forwarded}</td>
                    <td className="px-4 py-3 font-mono text-sm">{fee}</td>
                    <td className="px-4 py-3 font-mono text-sm">{mining}</td>
                    <td className="px-4 py-3 font-mono text-sm">{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Config & Data ── */}
        <section className="border-t border-blue/20 pt-8">
          <h2 className="font-display text-2xl font-semibold text-cream mb-4">Config & Data</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Data directory',  value: '~/.coinswap/taker/',   note: 'All taker state' },
              { label: 'Wallet file',     value: 'taker-wallet',          note: 'Encrypted — backup the mnemonic shown on first run' },
              { label: 'Offer cache',     value: 'offerbook.json',        note: 'Auto-refreshed each session' },
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
                  Mutinynet is a public custom signet with ~2-minute block times — the live marketplace for testing.
                  Get test coins from the faucet, then run through a full swap before touching mainnet.
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
            { href: LINKS.taker_app,       label: 'Taker App repo' },
            { href: LINKS.coinswap_repo,   label: 'Coinswap core repo' },
            { href: LINKS.coinswap_docker, label: 'Docker stack' },
            { href: LINKS.issues,          label: 'Open an issue' },
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
