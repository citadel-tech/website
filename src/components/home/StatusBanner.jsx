import { useState } from 'react'
import { LINKS } from '../../constants/links'

export default function StatusBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="border-b border-white/8 bg-[rgba(4,7,12,0.78)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.14em]">
          <span className="text-green/38">$</span>

          <span className="inline-flex items-center gap-1.5 border border-green/35 bg-green/7 px-2.5 py-1 text-green">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-green opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-green" />
            </span>
            STATUS: LIVE
          </span>

          <a
            href={LINKS.mutinynet}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/8 px-2.5 py-1 text-cream/48 transition-colors hover:border-blue-l/25 hover:text-blue-l"
          >
            mutinynet.com ↗
          </a>

          <span className="inline-flex items-center gap-1.5 border border-orange/35 bg-orange/7 px-2.5 py-1 text-orange">
            MAINNET: USE_WITH_CAUTION
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="p-1 text-cream/20 transition-colors hover:text-green/60"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
