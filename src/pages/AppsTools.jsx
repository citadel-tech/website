import { LINKS } from '../constants/links'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

// ─── Ecosystem table data ────────────────────────────────────────────────────

const ECOSYSTEM = [
  {
    name: 'coinswap',
    desc: 'Core protocol library, taker binary, maker daemon, and directory server.',
    lang: 'Rust',
    tags: ['core', 'daemon'],
    href: LINKS.coinswap_repo,
  },
  {
    name: 'taker-app',
    desc: 'Electron desktop application. The easiest way to perform coinswaps — no terminal needed.',
    lang: 'TypeScript',
    tags: ['GUI', 'taker'],
    href: LINKS.taker_app,
  },
  {
    name: 'maker-dashboard',
    desc: 'Web interface for maker node operators. Monitor balances, view swap history, manage the node.',
    lang: 'TypeScript',
    tags: ['GUI', 'maker'],
    href: LINKS.maker_dashboard,
  },
  {
    name: 'coinswap-docker',
    desc: 'Pre-configured Docker Compose stacks for both taker and maker. Fastest path to running a node.',
    lang: 'Docker',
    tags: ['infra', 'quickstart'],
    href: LINKS.coinswap_docker,
  },
  {
    name: 'coinswap-ffi',
    desc: 'Foreign Function Interface bindings — integrate coinswap into non-Rust applications.',
    lang: 'Rust',
    tags: ['library', 'FFI'],
    href: LINKS.coinswap_ffi,
  },
  {
    name: 'rust-coinselect',
    desc: 'Modular, BnB-based coin selection library used by the coinswap wallet internals.',
    lang: 'Rust',
    tags: ['library'],
    href: LINKS.rust_coinselect,
  },
  {
    name: 'mill.io',
    desc: 'Experimental Bitcoin coordination layer built on top of coinswap primitives.',
    lang: 'Rust',
    tags: ['experimental'],
    href: LINKS.mill_io,
  },
  {
    name: 'Coinswap Protocol Specification',
    desc: 'Formal specification of the protocol — message formats, state machines, cryptographic proofs.',
    lang: 'Markdown',
    tags: ['spec', 'docs'],
    href: LINKS.protocol_spec,
  },
]

const LANG_COLORS = {
  Rust:       'text-orange',
  TypeScript: 'text-blue-l',
  Docker:     'text-sky-400',
  Markdown:   'text-cream/50',
}

const TAG_VARIANTS = {
  core:        'blue',
  daemon:      'blue',
  GUI:         'blue',
  taker:       'blue',
  maker:       'orange',
  infra:       'blue',
  quickstart:  'orange',
  library:     'blue',
  FFI:         'blue',
  experimental:'amber',
  spec:        'blue',
  docs:        'blue',
}

// ─── Contributing section ────────────────────────────────────────────────────

const CONTRIBUTE_ITEMS = [
  {
    icon: '🐛',
    heading: 'Report a bug',
    body: 'Found something wrong? Open an issue on GitHub with steps to reproduce.',
    href: LINKS.issues,
    label: 'Open an issue',
  },
  {
    icon: '📖',
    heading: 'Read the contributing guide',
    body: 'Learn the development workflow, branch conventions, and PR process before submitting.',
    href: LINKS.contributing,
    label: 'Contributing guide',
  },
  {
    icon: '📐',
    heading: 'Review the protocol spec',
    body: 'Auditors and researchers: the full formal specification lives in its own repo.',
    href: LINKS.protocol_spec,
    label: 'Protocol Specification',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AppsTools() {
  return (
    <>
      {/* SEO */}
      <title>Apps & Tools — CoinSwap</title>
      <meta name="description" content="Explore the CoinSwap ecosystem: taker app, maker dashboard, Docker stacks, FFI bindings, and the coin selection library." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Hero ── */}
        <section>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-tight mb-4">
            Apps & Tools
          </h1>
          <p className="text-cream/60 text-lg font-body leading-relaxed max-w-2xl">
            The CoinSwap ecosystem — everything from the core protocol to desktop apps,
            Docker stacks, and developer libraries.
          </p>
        </section>

        {/* ── Ecosystem table ── */}
        <section className="border-t border-blue/20 pt-12">
          <h2 className="font-display text-2xl font-semibold text-cream mb-6">Ecosystem</h2>
          <div className="overflow-x-auto rounded-xl border border-blue/30">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-blue/30 bg-blue/10">
                  <th className="px-5 py-3 text-left text-cream/50 font-medium tracking-wide text-xs uppercase">Repo</th>
                  <th className="px-5 py-3 text-left text-cream/50 font-medium tracking-wide text-xs uppercase">Description</th>
                  <th className="px-5 py-3 text-left text-cream/50 font-medium tracking-wide text-xs uppercase hidden sm:table-cell">Lang</th>
                  <th className="px-5 py-3 text-left text-cream/50 font-medium tracking-wide text-xs uppercase hidden md:table-cell">Tags</th>
                  <th className="px-5 py-3 text-left text-cream/50 font-medium tracking-wide text-xs uppercase"></th>
                </tr>
              </thead>
              <tbody>
                {ECOSYSTEM.map(({ name, desc, lang, tags, href }) => (
                  <tr key={name} className="border-b border-blue/10 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono text-orange text-xs">{name}</span>
                    </td>
                    <td className="px-5 py-4 text-cream/65 leading-relaxed">{desc}</td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-mono ${LANG_COLORS[lang] ?? 'text-cream/40'}`}>{lang}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map(t => (
                          <Badge key={t} variant={TAG_VARIANTS[t] ?? 'blue'}>{t}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-l hover:underline text-xs font-body whitespace-nowrap"
                      >
                        GitHub ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Contributing ── */}
        <section className="border-t border-blue/20 pt-12">
          <h2 className="font-display text-2xl font-semibold text-cream mb-6">Get Involved</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {CONTRIBUTE_ITEMS.map(({ icon, heading, body, href, label }) => (
              <Card key={heading} className="flex flex-col">
                <span className="text-2xl mb-3">{icon}</span>
                <h3 className="font-display font-semibold text-cream text-base mb-2">{heading}</h3>
                <p className="text-cream/60 font-body text-sm leading-relaxed flex-1 mb-5">{body}</p>
                <Button
                  as="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center border border-blue/25 hover:border-blue/40"
                >
                  {label} ↗
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* ── GitHub org ── */}
        <section className="border-t border-blue/20 pt-10 text-center">
          <p className="text-cream/40 font-body text-sm mb-4">All repositories live under the Citadel Tech GitHub org.</p>
          <Button
            as="a"
            href={LINKS.github_org}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            github.com/citadel-tech ↗
          </Button>
        </section>
      </div>
    </>
  )
}
