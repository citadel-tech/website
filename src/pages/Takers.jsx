import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LINKS } from '../constants/links'
import CodeBlock from '../components/ui/CodeBlock'
import TabGroup from '../components/ui/TabGroup'

// ─── CLI snippets ─────────────────────────────────────────────────────────────

const CODE_CLI_BUILD = `git clone ${LINKS.openswap_repo}
cd openswap
cargo build --release
# builds: taker, makerd, maker-cli`

const CODE_CLI_INSTALL = `sudo install ./target/release/taker /usr/local/bin/`

const CODE_TAKER_HELP = `$ taker --help
A simple command line app to operate as openswap client.

The app works as a regular Bitcoin wallet with the added capability to perform
openswaps. It can talk to either a Bitcoin Core node (over RPC + ZMQ — the default)
or an Electrum-protocol server (via \`--electrum\`).

Usage: taker [OPTIONS] <COMMAND>

Commands:
  list-utxo           Lists all UTXOs we know about, along with their spend info
  list-utxo-regular   Lists all single-signature wallet UTXOs
  list-utxo-swap      Lists all UTXOs received in incoming swaps
  list-utxo-contract  Lists all UTXOs that we need to claim via timelock
  get-balances        Get total wallet balances of different categories
  get-new-address     Returns a new address
  send-to-address     Send to an external wallet address
  fetch-offers        Update the offerbook with current market offers and display them
  list-offers         List makers from the cached offerbook without a network sync
  poll-maker          Fetch and verify an offer from a single maker address
  remove-maker        Remove a maker from the local offerbook
  open-swap           Initiate the openswap process
  recover             Recover from all failed swaps
  backup              Backup the selected wallet
  restore             Restore a wallet from a backup file
  verify-deniability  Verify the deniability proof for a specific swap
  help                Print this message or the help of the given subcommand(s)

Options:
  -d, --data-directory <DATA_DIRECTORY>   [default: ~/.openswap/taker]
  -r, --ADDRESS:PORT <ADDRESS:PORT>       Bitcoin Core RPC  [default: 127.0.0.1:38332]
  -z, --ZMQ <ZMQ>                         Bitcoin Core ZMQ  [default: RPC host, port 28332]
  -a, --USER:PASSWORD <USER:PASSWORD>     Bitcoin Core RPC auth  [default: user:password]
  -t, --tor-auth <TOR_AUTH>               Tor control authentication
      --electrum <ELECTRUM_URL>           Use an Electrum backend instead of Bitcoin Core
      --electrum-tor                      Route Electrum through the Tor SOCKS proxy
  -w, --WALLET <WALLET>                   [default: taker-wallet]
  -p, --PASSWORD <PASSWORD>               Optional wallet encryption password
  -v, --verbosity <VERBOSITY>             [default: info]
                                          [possible values: off, error, warn, info, debug, trace]
  -h, --help                              Print help
  -V, --version                           Print version`

const CODE_CLI_RECOVER = `# List funds locked in failed swap contracts
taker list-utxo-contract

# Recover timelocked funds from failed swaps
taker recover`

const CODE_GUI_CLONE = `git clone ${LINKS.taker_app}
cd taker-app
npm install    # compiles Rust native module — takes 2–3 min`

const CODE_GUI_RUN = `# Development mode
npm run dev

# Production build
npm run dist
# outputs: TakerApp-0.2.1.AppImage  taker-app_0.2.1_amd64.snap`

const CODE_BITCOIN_CONF = `# ~/.bitcoin/bitcoin.conf — Signet
signet=1

[signet]
server=1
rest=1
txindex=1
rpcuser=user
rpcpassword=password
fallbackfee=0.00001000
blockfilterindex=1
addnode=172.81.178.3:38333
signetchallenge=0014a3ec9c731da66d9725d54947aede5c830623f33d`

// ─── FFI code snippets ────────────────────────────────────────────────────────

const CODE_FFI_JS_INSTALL = `npm install openswap-js
# or: yarn add openswap-js`

const CODE_FFI_JS = `import { AddressType, Taker } from 'openswap-js';

const rpcConfig = {
  url: 'http://127.0.0.1:18442',   // Bitcoin Core RPC endpoint
  username: 'user',
  password: 'password',
  walletName: 'taker_wallet',
};

const taker = new Taker(
  null,                            // null uses the default taker data directory
  'taker_wallet',                  // wallet file to load or create
  rpcConfig,
  9051,                            // Tor control port
  'openswap',                      // Tor control password
  'tcp://127.0.0.1:28332',         // Bitcoin Core ZMQ endpoint
  ''                               // optional wallet encryption password
);

Taker.setupLogging(null, 'info');
taker.syncAndSave();
taker.syncOfferbookAndWait();

const balances = taker.getBalances();
console.log(\`spendable: \${balances.spendable} sats\`);

const swapParams = {
  sendAmount: 1_000_000,           // total sats to swap
  makerCount: 2,                   // number of maker hops
  txCount: 1,                      // funding transaction splits
  requiredConfirms: 1,             // minimum funding confirmations
};

const swapId = taker.prepareOpenswap(swapParams);
const report = taker.startOpenswap(swapId);
console.log(\`swap id: \${report.swapId} — status: \${report.status}\`);`

const CODE_FFI_KOTLIN_BUILD = `cd openswap-kotlin

# Dev build (Linux host, native JVM)
bash ./build-scripts/development/build-dev-linux-jvm.sh

# Package the library
./gradlew :lib:assembleRelease`

const CODE_FFI_KOTLIN = `import org.openswap.*

val rpcConfig = RpcConfig(
    url = "http://127.0.0.1:18442",
    username = "user",
    password = "password",
    walletName = "taker_wallet"
)

val taker = Taker.init(
    dataDir = "/path/to/data",
    walletFileName = "taker_wallet",
    rpcConfig = rpcConfig,
    controlPort = 9051u,
    torAuthPassword = "openswap",
    zmqAddr = "tcp://127.0.0.1:28332",
    password = ""
)

taker.setupLogging(dataDir = "/path/to/data", logLevel = "info")
taker.syncAndSave()
taker.syncOfferbookAndWait()

val balances = taker.getBalances()
println("spendable: \${balances.spendable} sats")

val swapParams = SwapParams(
    protocol = null,
    sendAmount = 1_000_000u,
    makerCount = 2u,
    txCount = 1u,
    requiredConfirms = 1u,
    manuallySelectedOutpoints = null,
    preferredMakers = null
)

val swapId = taker.prepareOpenswap(swapParams)
val report = taker.startOpenswap(swapId)
println("swap id: \${report.swapId}")`

const CODE_FFI_REACT_NATIVE_BUILD = `cd openswap-react-native
npm install

# Build Rust library and generate Android JSI/TurboModule glue
npm run ubrn:android

# Build Rust library and generate iOS JSI/TurboModule glue
npm run ubrn:ios

npm run typecheck
npm test`

const CODE_FFI_REACT_NATIVE = `import { AddressType, OpenswapTaker } from 'openswap-react-native'

await OpenswapTaker.setupLogging(null, 'info')

const taker = await OpenswapTaker.init({
  dataDir: null,
  walletFileName: 'taker_wallet',
  rpcConfig: {
    url: 'localhost:18442',
    username: 'user',
    password: 'password',
    walletName: 'taker_wallet',
  },
  controlPort: 9051,
  torAuthPassword: 'openswap',
  zmqAddr: 'tcp://127.0.0.1:28332',
  password: '',
})

await taker.syncOfferbookAndWait()
await taker.syncAndSave()

const balances = await taker.getBalances()
const address = await taker.getNextExternalAddress(AddressType.P2WPKH)

const swapId = await taker.prepareOpenswap({
  protocol: 'Taproot',
  sendAmount: 1_000_000n,
  makerCount: 2,
  txCount: 1,
  requiredConfirms: 1,
})

const report = await taker.startOpenswap(swapId)

console.log('spendable:', balances.spendable, 'sats')
console.log('receive to:', address.addr)
console.log('swap id:', report.swapId)

await taker.dispose()`

const CODE_FFI_SWIFT_BUILD = `# Dev build (fast; targets host + iOS device + iOS simulator)
bash ./build-xcframework-dev.sh`

const CODE_FFI_SWIFT = `import Foundation
import Openswap

let rpcConfig = RpcConfig(
    url: "http://127.0.0.1:18442",
    username: "user",
    password: "password",
    walletName: "taker_wallet"
)

let taker = try Taker.\`init\`(
    dataDir: "/path/to/data",
    walletFileName: "taker_wallet",
    rpcConfig: rpcConfig,
    controlPort: 9051,
    torAuthPassword: "openswap",
    zmqAddr: "tcp://127.0.0.1:28332",
    password: ""
)

try taker.setupLogging(dataDir: "/path/to/data", logLevel: "info")
try taker.syncAndSave()
try taker.syncOfferbookAndWait()

let balances = try taker.getBalances()
print("spendable: \\(balances.spendable) sats")

let swapParams = SwapParams(
    protocol: nil,
    sendAmount: 1_000_000,
    makerCount: 2,
    txCount: 1,
    requiredConfirms: 1,
    manuallySelectedOutpoints: nil,
    preferredMakers: nil
)

let swapId = try taker.prepareOpenswap(swapParams: swapParams)
let report = try taker.startOpenswap(swapId: swapId)
print("swap id: \\(report.swapId)")`

const CODE_FFI_PYTHON_BUILD = `cd openswap-python

# Dev build (Linux host)
bash ./build-scripts/development/build-dev-linux-x86_64.sh

# Build wheel / sdist
python -m build`

const CODE_FFI_PYTHON = `from openswap import AddressType, RpcConfig, SwapParams, Taker

rpc_config = RpcConfig(
    url="http://127.0.0.1:18442",
    username="user",
    password="password",
    wallet_name="taker_wallet"
)

taker = Taker.init(
    data_dir="/path/to/data",
    wallet_file_name="taker_wallet",
    rpc_config=rpc_config,
    control_port=9051,
    tor_auth_password="openswap",
    zmq_addr="tcp://127.0.0.1:28332",
    password=""
)

taker.setup_logging(data_dir="/path/to/data", log_level="Info")
taker.sync_and_save()
taker.sync_offerbook_and_wait()

balances = taker.get_balances()
print(f"spendable: {balances.spendable} sats")

swap_params = SwapParams(
    protocol=None,
    send_amount=1_000_000,
    maker_count=2,
    tx_count=1,
    required_confirms=1,
    manually_selected_outpoints=None,
    preferred_makers=None
)

swap_id = taker.prepare_openswap(swap_params=swap_params)
report = taker.start_openswap(swap_id=swap_id)
print(f"swap id: {report.swap_id}")`

const CODE_FFI_RUBY_BUILD = `cd openswap-ruby

# Dev build (Linux host) — builds ffi-commons, regenerates openswap.rb,
# and stages the native library at the package root
bash ./build-scripts/development/build-dev-linux-x86_64.sh`

const CODE_FFI_RUBY = `require 'openswap'

rpc_config = Openswap::RpcConfig.new(
  url: 'http://127.0.0.1:18442',
  username: 'user',
  password: 'password',
  wallet_name: 'taker_wallet'
)

taker = Openswap::Taker.init(
  '/path/to/data',
  'taker_wallet',
  rpc_config,
  9051,
  'openswap',
  'tcp://127.0.0.1:28332',
  ''
)

taker.setup_logging('/path/to/data', 'info')
taker.sync_and_save
taker.sync_offerbook_and_wait

balances = taker.get_balances
puts "spendable: #{balances.spendable} sats"

swap_params = Openswap::SwapParams.new(
  protocol: nil,
  send_amount: 1_000_000,
  maker_count: 2,
  tx_count: 1,
  required_confirms: 1,
  manually_selected_outpoints: nil,
  preferred_makers: nil
)

swap_id = taker.prepare_openswap(swap_params)
report = taker.start_openswap(swap_id)
puts "swap id: #{report.swap_id}"`

// ─── Install tabs ─────────────────────────────────────────────────────────────

const INSTALL_TABS = [
  {
    label: 'CLI (from source)',
    content: (
      <div className="space-y-5">
        <div>
          <p className="type-meta text-cream/65 font-body uppercase tracking-widest mb-2">Step 1 — Clone & build</p>
          <CodeBlock code={CODE_CLI_BUILD} language="bash" />
        </div>
        <div>
          <p className="type-meta text-cream/65 font-body uppercase tracking-widest mb-2">Step 2 — Install binary</p>
          <CodeBlock code={CODE_CLI_INSTALL} language="bash" />
        </div>
        <div>
          <p className="type-meta text-cream/65 font-body uppercase tracking-widest mb-2">Step 3 — Verify</p>
          <CodeBlock code={CODE_TAKER_HELP} language="text" />
        </div>
      </div>
    ),
  },
  {
    label: 'Desktop GUI',
    content: (
      <div className="space-y-5">
        <p className="type-small text-cream/70 font-body">
          The Taker App is an Electron desktop application built on top of <code className="inline-code">openswap-ffi</code>.
          No terminal required for day-to-day use. Initial install compiles a Rust native module — allow 2–3 minutes.
        </p>
        <div>
          <p className="type-meta text-cream/65 font-body uppercase tracking-widest mb-2">Step 1 — Clone & install</p>
          <CodeBlock code={CODE_GUI_CLONE} language="bash" />
        </div>
        <div>
          <p className="type-meta text-cream/65 font-body uppercase tracking-widest mb-2">Step 2 — Run or build</p>
          <CodeBlock code={CODE_GUI_RUN} language="bash" />
        </div>
        <p className="type-meta text-cream/65 font-body">
          Repo:{' '}
          <a href={LINKS.taker_app} target="_blank" rel="noopener noreferrer" className="simple-link inline-flex items-center gap-1.5">
            citadel-foss/taker-app
            <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </p>
      </div>
    ),
  },
]

// ─── FFI language tabs ────────────────────────────────────────────────────────

const FFI_TABS = [
  {
    label: 'JavaScript',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          NAPI bindings for Node.js and Electron. Pre-built for x64 and ARM64 on Linux, macOS, and Windows.
          Powers the <a href={LINKS.taker_app} target="_blank" rel="noopener noreferrer" className="simple-link">Taker App</a>.
        </p>
        <CodeBlock code={CODE_FFI_JS_INSTALL} language="bash" />
        <CodeBlock code={CODE_FFI_JS} language="typescript" />
      </div>
    ),
  },
  {
    label: 'Kotlin',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          UniFFI bindings for Android (API 24+) and JVM. Supports arm64-v8a, armeabi-v7a, and x86_64 architectures.
        </p>
        <p className="type-meta text-cream/65 font-body uppercase tracking-widest">Generate bindings</p>
        <CodeBlock code={CODE_FFI_KOTLIN_BUILD} language="bash" />
        <CodeBlock code={CODE_FFI_KOTLIN} language="kotlin" />
      </div>
    ),
  },
  {
    label: 'React Native',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          JSI TurboModule bindings for React Native 0.76+ apps. Supports Android arm64-v8a,
          armeabi-v7a, x86_64, plus iOS device and simulator targets through generated native glue.
        </p>
        <p className="type-meta text-cream/65 font-body uppercase tracking-widest">Build & test</p>
        <CodeBlock code={CODE_FFI_REACT_NATIVE_BUILD} language="bash" />
        <CodeBlock code={CODE_FFI_REACT_NATIVE} language="typescript" />
        <p className="type-meta text-cream/65 font-body">
          Full README:{' '}
          <a href={LINKS.ffi_react_native_repo} target="_blank" rel="noopener noreferrer" className="simple-link inline-flex items-center gap-1.5">
            openswap-react-native
            <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </p>
      </div>
    ),
  },
  {
    label: 'Swift',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          UniFFI bindings for iOS and macOS (Swift 5.7+, Xcode 14+). Builds an xcframework targeting all Apple platforms.
        </p>
        <p className="type-meta text-cream/65 font-body uppercase tracking-widest">Build xcframework</p>
        <CodeBlock code={CODE_FFI_SWIFT_BUILD} language="bash" />
        <CodeBlock code={CODE_FFI_SWIFT} language="swift" />
      </div>
    ),
  },
  {
    label: 'Python',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          UniFFI bindings for Python 3.8+. Cross-platform: Linux (.so), macOS (.dylib), Windows (.dll).
        </p>
        <p className="type-meta text-cream/65 font-body uppercase tracking-widest">Build & install</p>
        <CodeBlock code={CODE_FFI_PYTHON_BUILD} language="bash" />
        <CodeBlock code={CODE_FFI_PYTHON} language="python" />
      </div>
    ),
  },
  {
    label: 'Ruby',
    content: (
      <div className="space-y-4">
        <p className="type-small text-cream/70 font-body">
          UniFFI bindings for Ruby 2.7+. Works standalone or as a Rails gem via the FFI gem.
          Use a mutex when accessing the taker from multiple threads.
        </p>
        <p className="type-meta text-cream/65 font-body uppercase tracking-widest">Build & install</p>
        <CodeBlock code={CODE_FFI_RUBY_BUILD} language="bash" />
        <CodeBlock code={CODE_FFI_RUBY} language="ruby" />
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
  { cmd: 'get-new-address',    desc: 'Generate a receiving address to fund your wallet' },
  { cmd: 'get-balances',       desc: 'Show balance by category (regular, swap, contract, spendable)' },
  { cmd: 'fetch-offers',       desc: 'Sync the offer book with current maker offers' },
  { cmd: 'list-offers',        desc: 'List makers from the cached offer book without a network sync' },
  { cmd: 'poll-maker',         desc: 'Fetch and verify an offer from a single maker address' },
  { cmd: 'remove-maker',       desc: 'Remove a maker from the local offer book' },
  { cmd: 'open-swap',          desc: 'Initiate an openswap with available makers' },
  { cmd: 'list-utxo',          desc: 'List all UTXOs with type and spend info' },
  { cmd: 'list-utxo-regular',  desc: 'Regular (non-swap) wallet UTXOs only' },
  { cmd: 'list-utxo-swap',     desc: 'UTXOs received from completed swaps' },
  { cmd: 'list-utxo-contract', desc: 'Timelocked HTLCs — run recover if non-empty' },
  { cmd: 'recover',            desc: 'Claim funds from all failed or timed-out swaps' },
  { cmd: 'send-to-address',    desc: 'Send sats to an external address' },
  { cmd: 'backup',             desc: 'Backup the selected wallet to a file' },
  { cmd: 'restore',            desc: 'Restore a wallet from a backup file' },
  { cmd: 'verify-deniability', desc: 'Verify the deniability proof for a specific swap' },
]

// ─── Fee table (current maker default quote schedule) ─────────────────────────

const FEES = [
  { participant: 'Maker 1', received: '500,000', locktime: '40', forwarded: '499,467', quote: '533',   total: '533',    highlight: false },
  { participant: 'Maker 2', received: '499,467', locktime: '20', forwarded: '498,944', quote: '523',   total: '1,056',  highlight: false },
  { participant: 'You',     received: '—',       locktime: '—',  forwarded: '~498,944', quote: '—',    total: '~1,056 + mining', highlight: true },
]

// ─── What is a Taker cards ────────────────────────────────────────────────────

const TAKER_CARDS = [
  {
    label: 'You Initiate',
    heading: 'You pick the amount, hops, and timing',
    body: 'As the taker, you control the swap parameters. You choose how much to swap and how many makers to route through. No counterparty can front-run or delay you — the protocol is fully taker-driven.',
  },
  {
    label: 'Multi-Hop Routing',
    heading: 'Coins cycle through independent makers',
    body: 'Your funds route through N independent makers in a cyclic flow. No single maker sees the full route — each only knows its adjacent hops. Each hop independently breaks the transaction trail.',
  },
  {
    label: 'Clean UTXOs',
    heading: 'You receive coins with no shared on-chain history',
    body: 'You send one set of coins and receive a different set with no on-chain link to your originals. Non-custodial throughout — you hold the keys at every step and have a recovery path if anything stalls.',
  },
]

// ─── Screenshots ──────────────────────────────────────────────────────────────

const SCREENSHOTS = [
  { src: LINKS.screenshot_wallet, caption: 'balance overview' },
  { src: LINKS.screenshot_swap,   caption: 'initiate swap' },
  { src: LINKS.screenshot_swap1,  caption: 'swap in progress' },
  { src: LINKS.screenshot_report, caption: 'swap report' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Takers() {
  return (
    <>
      <title>Takers — OpenSwap</title>
      <meta name="description" content="Run OpenSwap as a taker. Install the taker CLI or desktop GUI, route your coins through independent makers, and receive clean UTXOs with no on-chain history." />

      <div className="site-shell py-8 space-y-7">

        {/* ── Hero ── */}
        <section>
          <h1 className="type-page-title font-display font-bold text-cream mb-3">
            Swap Bitcoin Trustlessly
          </h1>
          <p className="type-subtitle text-cream/60 font-body max-w-4xl">
            You send one set of coins. You receive a different set with no shared on-chain history.
            No custodian, no mixer, no trust required — just a taker-driven protocol with atomic recovery at every hop.
          </p>
        </section>

        {/* ── What is a Taker ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// Role</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">What is a Taker?</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {TAKER_CARDS.map(({ label, heading, body }) => (
              <div key={label} className="border border-dotted border-black/20 bg-black/[0.02] p-5">
                <p className="type-caption mb-2 font-mono uppercase tracking-[0.18em] text-cream/65">{label}</p>
                <h3 className="type-card-title mb-2 font-display font-semibold text-cream">{heading}</h3>
                <p className="type-small font-body text-cream/68">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Choose Your Path ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// Get Started</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">Choose Your Method</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-dotted border-black/20 bg-black/[0.02] p-5 flex flex-col">
              <p className="type-caption font-mono uppercase tracking-[0.18em] text-green/70 mb-2">[ GUI ]</p>
              <h3 className="type-card-title font-display font-semibold text-cream mb-2">Taker App</h3>
              <p className="type-small font-body text-cream/68 mb-4 flex-1">
                Electron desktop application. No terminal required for day-to-day use.
                Built on <code className="inline-code">openswap-ffi</code> — the same library powering all language bindings.
              </p>
              <p className="type-meta inline-flex items-center gap-1.5 text-cream/65 font-mono">
                npm install
                <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                npm run dev
              </p>
            </div>
            <div className="border border-dotted border-black/20 bg-black/[0.02] p-5 flex flex-col">
              <p className="type-caption font-mono uppercase tracking-[0.18em] text-orange/70 mb-2">[ CLI ]</p>
              <h3 className="type-card-title font-display font-semibold text-cream mb-2">taker binary</h3>
              <p className="type-small font-body text-cream/68 mb-4 flex-1">
                Terminal-first, full control. Build from source with cargo, install system-wide,
                and run swaps from the command line with full access to all subcommands.
              </p>
              <p className="type-meta inline-flex items-center gap-1.5 text-cream/65 font-mono">
                cargo build --release
                <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                taker --help
              </p>
            </div>
          </div>
        </section>

        {/* ── Prerequisites ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Prerequisites</h2>
          <ul className="space-y-3 mb-6">
            {[
              <>
                <strong className="text-cream">Bitcoin Core</strong> running on{' '}
                <a href={LINKS.signet} target="_blank" rel="noopener noreferrer" className="simple-link">Signet</a>
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
          <p className="type-small text-cream/60 font-body mb-2">Signet bitcoin.conf:</p>
          <CodeBlock code={CODE_BITCOIN_CONF} language="ini" />
        </section>

        {/* ── Installation ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-5">Installation</h2>
          <TabGroup tabs={INSTALL_TABS} />
        </section>

        {/* ── Taker App Screenshots ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// Desktop App</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-2">Taker App</h2>
          <p className="type-small text-cream/60 font-body mb-5">
            An Electron GUI built on <code className="inline-code">openswap-ffi</code>. Manages wallet balance,
            offer discovery, and swap execution without touching the terminal.{' '}
            <a href={LINKS.taker_app} target="_blank" rel="noopener noreferrer" className="simple-link inline-flex items-center gap-1.5">
              citadel-foss/taker-app
              <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {SCREENSHOTS.map(({ src, caption }) => (
              <div key={caption} className="border border-dotted border-cream/15 bg-black/30 rounded overflow-hidden">
                <img
                  src={src}
                  alt={caption}
                  className="w-full aspect-[2/1] object-contain block"
                  loading="lazy"
                />
                <p className="type-caption font-mono text-cream/65 px-3 py-2 border-t border-dotted border-cream/15">{caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Command Reference ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Command Reference</h2>
          <div className="overflow-x-auto">
            <table className="simple-table type-ui font-body">
              <thead>
                <tr>
                  <th className="type-ui px-4 py-3 text-left text-cream/65 font-medium tracking-wide uppercase">Subcommand</th>
                  <th className="type-ui px-4 py-3 text-left text-cream/65 font-medium tracking-wide uppercase">Description</th>
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
          <p className="type-meta text-cream/65 font-body mt-2">
            Full docs:{' '}
            <a href={LINKS.taker_docs} target="_blank" rel="noopener noreferrer" className="simple-link inline-flex items-center gap-1.5">
              docs/taker.md
              <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </p>
        </section>

        {/* ── Balance Categories ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-4">Balance Categories</h2>
          <div className="overflow-x-auto mb-3">
            <table className="simple-table type-ui font-body">
              <thead>
                <tr>
                  <th className="type-ui px-4 py-3 text-left text-cream/65 font-medium tracking-wide uppercase">Type</th>
                  <th className="type-ui px-4 py-3 text-left text-cream/65 font-medium tracking-wide uppercase">Description</th>
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
            <p className="type-meta text-cream/65 font-body font-medium uppercase tracking-widest mb-2">If contract balance is non-zero</p>
            <p className="type-small text-cream/70 font-body mb-3">
              A non-zero <code className="inline-code">contract</code> balance means funds are locked in timelocked HTLC outputs from a failed or in-progress swap.
              Run <code className="inline-code">taker recover</code> to claim them back.
            </p>
            <CodeBlock code={CODE_CLI_RECOVER} language="bash" />
          </div>
        </section>

        {/* ── Fee Expectations ── */}
        <section className="section-rule">
          <h2 className="type-section-title font-display font-semibold text-cream mb-2">Fee Expectations</h2>
          <p className="type-ui text-cream/60 font-body mb-4">
            Example maker quote: 2 makers, 3 tx splits, 500,000 sat input. Current defaults are
            500 sat base + 0.0025% of received amount + 0.0001% per refund-locktime block.
            Mining fees are dynamic; the current 2-maker Taproot path is about 1,634 sats total
            taker spendable change.
          </p>
          <div className="overflow-x-auto rounded-lg border border-blue/30">
            <table className="w-full type-ui font-body">
              <thead>
                <tr className="border-b border-blue/30 bg-blue/10">
                  {['Participant', 'Received (sat)', 'Locktime', 'Forwarded (sat)', 'Maker quote', 'Cumulative quote'].map(h => (
                    <th key={h} className="type-ui px-4 py-3 text-left text-cream/65 font-medium tracking-wide uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEES.map(({ participant, received, locktime, forwarded, quote, total, highlight }) => (
                  <tr key={participant}
                    className={`border-b border-blue/10 last:border-0 transition-colors ${
                      highlight ? 'bg-black text-[#f7f2e8] font-semibold' : 'text-cream/70 hover:bg-white/2'
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{participant}</td>
                    <td className="type-ui px-4 py-3 font-mono">{received}</td>
                    <td className="type-ui px-4 py-3 font-mono">{locktime}</td>
                    <td className={`type-ui px-4 py-3 font-mono ${highlight ? 'text-[#f7f2e8]' : 'text-cream'}`}>{forwarded}</td>
                    <td className="type-ui px-4 py-3 font-mono">{quote}</td>
                    <td className="type-ui px-4 py-3 font-mono">{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Build with OpenSwap FFI ── */}
        <section className="section-rule">
          <p className="section-label mb-3">// For Developers</p>
          <h2 className="type-section-title font-display font-semibold text-cream mb-3">Build Your Own Taker App</h2>
          <p className="type-body text-cream/70 font-body max-w-2xl mb-5">
            <a href={LINKS.openswap_ffi} target="_blank" rel="noopener noreferrer" className="simple-link">openswap-ffi</a>{' '}
            wraps the core Rust taker logic in a UniFFI-generated foreign function interface, exposing{' '}
            <code className="inline-code">Taker.init()</code>, <code className="inline-code">getBalances()</code>,{' '}
            <code className="inline-code">fetchOffers()</code>, and <code className="inline-code">prepareOpenswap()</code> / <code className="inline-code">startOpenswap()</code>{' '}
            across desktop, mobile, and server-side bindings. The Electron Taker App is itself built on top of the JS binding.
          </p>

          {/* Requirements callout */}
          <div className="border border-dotted border-black/20 bg-black/[0.02] p-4 mb-6">
            <p className="type-meta text-cream/65 font-body font-medium uppercase tracking-widest mb-3">Common requirements</p>
            <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Rust', value: '≥ 1.75.0' },
                  { label: 'Bitcoin Core', value: 'synced, non-pruned, -txindex' },
                  { label: 'Tor', value: 'daemon running' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="type-meta text-cream/65 font-body uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="type-ui font-mono text-cream/80">{value}</p>
                  </div>
                ))}
              </div>
          </div>

          <TabGroup tabs={FFI_TABS} />

          <p className="type-meta text-cream/65 font-body mt-4">
            Full repo:{' '}
            <a href={LINKS.openswap_ffi} target="_blank" rel="noopener noreferrer" className="simple-link inline-flex items-center gap-1.5">
              citadel-foss/openswap-ffi
              <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </p>
        </section>

        {/* ── Test on Signet ── */}
        <section className="section-rule">
          <div className="flex items-start gap-4">
            <span className="text-2xl">⚡</span>
            <div>
              <h2 className="font-display text-xl font-semibold text-cream mb-2">
                Test on Signet
              </h2>
              <p className="text-cream/70 font-body text-sm leading-relaxed mb-4">
                Start on Signet — the live OpenSwap marketplace on custom signet.
                Get test coins from the faucet to fund your wallet and try your first swap.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={LINKS.signet} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-black/20 px-4 py-2 text-sm font-body font-medium text-cream transition-all duration-200 hover:bg-[#f7931a]/16 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_14px_34px_rgba(247,147,26,0.2),0_0_24px_rgba(247,147,26,0.16)]">
                  Explorer
                  <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
                </a>
                <a href={LINKS.signet_faucet} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-black/20 px-4 py-2 text-sm font-body font-medium text-cream transition-all duration-200 hover:bg-[#f7931a]/16 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_14px_34px_rgba(247,147,26,0.2),0_0_24px_rgba(247,147,26,0.16)]">
                  Faucet
                  <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
                </a>
                <Link to={`/docs?doc=${encodeURIComponent('manuals/demo')}`}
                  className="inline-flex items-center gap-1.5 border border-black/20 px-4 py-2 text-sm font-body font-medium text-cream transition-all duration-200 hover:bg-[#f7931a]/16 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_14px_34px_rgba(247,147,26,0.2),0_0_24px_rgba(247,147,26,0.16)]">
                  Demo Doc
                  <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>
                <Link to="/market"
                  className="inline-flex items-center gap-1.5 border border-black/20 px-4 py-2 text-sm font-body font-medium text-cream transition-all duration-200 hover:bg-[#f7931a]/16 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_14px_34px_rgba(247,147,26,0.2),0_0_24px_rgba(247,147,26,0.16)]">
                  Market
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer links ── */}
        <section className="section-rule flex flex-wrap gap-4">
          {[
            { href: LINKS.taker_app,     label: 'Taker App repo' },
            { href: LINKS.openswap_repo, label: 'OpenSwap core' },
            { href: LINKS.openswap_ffi,  label: 'FFI bindings' },
            { href: LINKS.taker_docs,    label: 'CLI docs' },
            { href: LINKS.issues,        label: 'Open an issue' },
          ].map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="type-ui inline-flex items-center gap-1.5 text-blue-l hover:underline font-body">
              {label}
              <ExternalLink size={13} strokeWidth={1.8} aria-hidden="true" />
            </a>
          ))}
        </section>

      </div>
    </>
  )
}
