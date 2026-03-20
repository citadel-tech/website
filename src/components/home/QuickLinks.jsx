import { LINKS } from '../../constants/links'

const ITEMS = [
  {
    label: 'GitHub',
    sub: 'citadel-tech/coinswap',
    href: LINKS.coinswap_repo,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Protocol Spec',
    sub: 'Coinswap-Protocol-Specification',
    href: LINKS.protocol_spec,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: 'Mutinynet',
    sub: 'Signet testnet explorer',
    href: LINKS.mutinynet,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="22" height="22">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: 'Matrix',
    sub: 'Community chat',
    href: LINKS.matrix,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033a3.18 3.18 0 0 1 1.117-1.024 3.13 3.13 0 0 1 1.555-.396 3.67 3.67 0 0 1 1.516.294c.435.178.814.47 1.096.842.282.38.466.8.578 1.313.111.514.165 1.08.165 1.72v4.748H12v-4.54c0-.36-.02-.702-.062-1.03a2.55 2.55 0 0 0-.255-.866 1.64 1.64 0 0 0-.558-.608 1.69 1.69 0 0 0-.954-.23 1.87 1.87 0 0 0-.997.254 2.08 2.08 0 0 0-.666.672 2.97 2.97 0 0 0-.368.965 5.74 5.74 0 0 0-.112 1.142v4.24H7.317V7.81zm6.98 0v1.157h.033c.284-.44.66-.807 1.108-1.056a3.13 3.13 0 0 1 1.563-.397 3.7 3.7 0 0 1 1.516.294 3.03 3.03 0 0 1 1.096.842c.282.38.47.8.578 1.313.107.514.162 1.08.162 1.72v4.748h-1.734v-4.54c0-.36-.02-.702-.063-1.03a2.55 2.55 0 0 0-.254-.866 1.64 1.64 0 0 0-.558-.608 1.71 1.71 0 0 0-.955-.23 1.87 1.87 0 0 0-.998.254 2.08 2.08 0 0 0-.665.672 3.01 3.01 0 0 0-.37.965 5.9 5.9 0 0 0-.11 1.142v4.24h-1.733V7.81zm7.32 13.63v-1.157h-.033a3.2 3.2 0 0 1-1.116 1.024 3.13 3.13 0 0 1-1.556.396 3.68 3.68 0 0 1-1.516-.294 3.07 3.07 0 0 1-1.096-.843 3.57 3.57 0 0 1-.578-1.312 7.1 7.1 0 0 1-.165-1.72V14.58h1.733v4.54c0 .36.02.702.063 1.03a2.55 2.55 0 0 0 .254.866c.142.255.33.464.558.608.228.144.515.23.955.23a1.87 1.87 0 0 0 .997-.254 2.08 2.08 0 0 0 .666-.672 2.97 2.97 0 0 0 .368-.965 5.74 5.74 0 0 0 .112-1.142V14.58h1.733v7.86zm2.664-13.63V24h-2.28v-.55H24V0h-2.28v-.55h2.28V0H24v24h-2.28v-.55h1.647V.55z" />
      </svg>
    ),
  },
]

export default function QuickLinks() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="section-label mb-2">// network access</p>
          <h2 className="type-section-title font-display font-semibold tracking-[0.04em] text-cream">
            Jump straight into the ecosystem.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-black/12 bg-white/20 p-3 shadow-[0_14px_40px_rgba(0,0,0,0.05)] backdrop-blur-sm sm:grid-cols-4 sm:gap-4 sm:p-4">
        {ITEMS.map(({ label, sub, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[8.5rem] flex-col items-start justify-between rounded-xl border border-black/10 bg-[rgba(255,255,255,0.18)] p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-black/20 hover:bg-white/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <span className="inline-flex rounded-lg border border-black/10 bg-black/[0.04] p-2 text-cream/45 transition-colors group-hover:border-black/15 group-hover:text-cream">
              {icon}
            </span>
            <span className="type-small mt-4 font-mono font-medium uppercase tracking-[0.12em] text-cream/80 transition-colors group-hover:text-cream">
              {label}
            </span>
            <span className="type-meta mt-1 font-mono uppercase tracking-[0.08em] text-cream/38 transition-colors group-hover:text-cream/72">
              {sub}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
