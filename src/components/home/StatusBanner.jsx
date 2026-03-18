import { useState } from 'react'
import { LINKS } from '../../constants/links'

export default function StatusBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="bg-navy border-b border-blue/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-center gap-3 text-sm font-body">
          {/* Live badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-orange/15 text-orange border-orange/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
            </span>
            Live on Mutinynet
          </span>

          <a
            href={LINKS.mutinynet}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/60 hover:text-cream transition-colors"
          >
            mutinynet.com ↗
          </a>

          {/* Warning badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber/15 text-amber border-amber/30">
            ⚠ Mainnet: use with caution
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="text-cream/30 hover:text-cream/70 transition-colors p-1 rounded"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
