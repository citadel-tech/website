export default function StatusBanner({ releaseTag, releaseUrl }) {
  return (
    <div className="border-b border-dotted border-black/15 bg-gradient-to-r from-black/[0.04] via-white/25 to-black/[0.04]">
      <div className="site-shell flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
        <div className="type-caption flex flex-wrap items-center gap-3 font-mono uppercase tracking-[0.14em]">
          {releaseTag && releaseUrl && (
            <a
              href={releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-[#f7931a]/20 bg-[#f7931a]/10 px-3 py-1.5 text-cream shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_10px_28px_rgba(247,147,26,0.12)] transition-all duration-200 hover:bg-[#f7931a]/16 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_14px_34px_rgba(247,147,26,0.2),0_0_24px_rgba(247,147,26,0.16)]"
            >
              LATEST: {releaseTag} ↗
            </a>
          )}

          <span className="inline-flex items-center gap-1.5 border border-black/15 bg-black/[0.07] px-3 py-1.5 text-cream shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.65)]" />
            </span>
            STATUS: LIVE ON MUTINYNET
          </span>

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
