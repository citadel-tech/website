import { LINKS } from './links.js'

const base     = LINKS.docs_manuals_base
const exBase   = LINKS.docs_examples_base
const specBase = LINKS.docs_spec_base
const ffiBase  = LINKS.docs_ffi_base
const makerDashboardPackagingBase = LINKS.docs_maker_dashboard_packaging_base

export const NAV = [
  {
    id: 'get-started',
    label: 'Get Started',
    static: true,
  },
  {
    id: 'manuals',
    label: 'Manuals',
    items: [
      { label: 'Taker',      url: `${base}/taker.md` },
      { label: 'Makerd',     url: `${base}/makerd.md` },
      { label: 'Maker CLI',  url: `${base}/maker-cli.md` },
      { label: 'Bitcoind',   url: `${base}/bitcoind.md` },
      { label: 'Tor',        url: `${base}/tor.md` },
      { label: 'Docker',     url: `${base}/docker.md` },
      { label: 'Taproot',    url: `${base}/taproot.md` },
      { label: 'Demo v1',    url: `${base}/demo-v1.md` },
      { label: 'Demo v2',    url: `${base}/demo-v2.md` },
      { label: 'Demo v2.1',  url: `${base}/demo-v2.1.md` },
      { label: 'Workshop',   url: `${base}/workshop.md` },
    ],
  },
  {
    id: 'general-specs',
    label: 'General Specs',
    items: [
      { label: 'Introduction', url: `${specBase}/general%20specs/introduction.md` },
      { label: 'Architecture', url: `${specBase}/general%20specs/architecture.md` },
      { label: 'Fees',         url: `${specBase}/general%20specs/fees.md` },
      { label: 'Fidelity',     url: `${specBase}/general%20specs/fidelity.md` },
      { label: 'Privacy',      url: `${specBase}/general%20specs/privacy.md` },
      { label: 'Security',     url: `${specBase}/general%20specs/security.md` },
    ],
  },
  {
    id: 'v1-protocol',
    label: 'V1 Protocol',
    items: [
      { label: 'Protocol Flow', url: `${specBase}/v1%20protocol/protocol-flow.md` },
      { label: 'Contract',      url: `${specBase}/v1%20protocol/contract.md` },
      { label: 'Messages',      url: `${specBase}/v1%20protocol/messages.md` },
    ],
  },
  {
    id: 'v2-protocol',
    label: 'V2 Protocol',
    items: [
      { label: 'Protocol Flow', url: `${specBase}/v2%20protocol/protocol-flow.md` },
      { label: 'Contract',      url: `${specBase}/v2%20protocol/contract.md` },
      { label: 'Messages',      url: `${specBase}/v2%20protocol/messages.md` },
    ],
  },
  {
    id: 'examples',
    label: 'Examples',
    items: [
      { label: 'Taker Basic',  url: `${exBase}/taker_basic.rs`,  lang: 'rust' },
      { label: 'Wallet Basic', url: `${exBase}/wallet_basic.rs`, lang: 'rust' },
    ],
  },
  {
    id: 'ffis',
    label: 'FFIs',
    items: [
      { label: 'JavaScript', url: `${ffiBase}/coinswap-js/README.md`,     repoUrl: LINKS.ffi_js_repo },
      { label: 'Python',     url: `${ffiBase}/coinswap-python/README.md`, repoUrl: LINKS.ffi_python_repo },
      { label: 'Kotlin',     url: `${ffiBase}/coinswap-kotlin/README.md`, repoUrl: LINKS.ffi_kotlin_repo },
      { label: 'Swift',      url: `${ffiBase}/coinswap-swift/README.md`,  repoUrl: LINKS.ffi_swift_repo },
      { label: 'Ruby',       url: `${ffiBase}/coinswap-ruby/README.md`,   repoUrl: LINKS.ffi_ruby_repo },
    ],
  },
  {
    id: 'guis',
    label: 'GUIs',
    items: [
      { label: 'Taker App',       url: LINKS.docs_taker_app_usage,      repoUrl: LINKS.taker_app },
      { label: 'Maker Dashboard', url: LINKS.docs_maker_dashboard_arch, repoUrl: LINKS.maker_dashboard },
    ],
  },
  {
    id: 'dockers',
    label: 'Docker',
    items: [
      {
        label: 'myNode',
        url: `${makerDashboardPackagingBase}/mynode/README.md`,
        repoUrl: LINKS.maker_dashboard_mynode_repo,
      },
      {
        label: 'Umbrel',
        url: `${makerDashboardPackagingBase}/umbrel/README.md`,
        repoUrl: LINKS.maker_dashboard_umbrel_repo,
      },
    ],
  },
]

export function collectAllUrls(nav) {
  const urls = []
  for (const section of nav) {
    if (section.items) {
      section.items.forEach(i => urls.push(i.url))
    }
    if (section.subsections) {
      section.subsections.forEach(sub =>
        sub.items.forEach(i => urls.push(i.url))
      )
    }
  }
  return urls
}
