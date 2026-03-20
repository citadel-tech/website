import { LINKS } from '../../constants/links'

export default function StatusBanner() {
  return (
    <div className="border-b border-dotted border-black/15 bg-gradient-to-r from-black/[0.04] via-white/25 to-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.14em]">
          <span className="inline-flex items-center gap-1.5 border border-black/15 bg-black/[0.07] px-3 py-1.5 text-cream shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.65)]" />
            </span>
            STATUS: LIVE ON MUTINYNET
          </span>

          <a
            href={LINKS.mutinynet}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black/12 bg-white/35 px-3 py-1.5 text-cream/72 shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_12px_30px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-px hover:border-black/25 hover:bg-white/55 hover:text-cream"
          >
            mutinynet.com ↗
          </a>

          <span className="inline-flex items-center gap-1.5 border border-black/15 bg-black/[0.045] px-3 py-1.5 text-cream shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_10px_28px_rgba(0,0,0,0.06)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5 text-[#fbbf24] drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
              fill="currentColor"
            >
              <path d="M10 2.5 18 17H2L10 2.5Zm0 4.2a.9.9 0 0 0-.9.9v4.1a.9.9 0 1 0 1.8 0V7.6a.9.9 0 0 0-.9-.9Zm0 8.1a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" />
            </svg>
            MAINNET: USE_WITH_CAUTION
          </span>
        </div>
      </div>
    </div>
  )
}
