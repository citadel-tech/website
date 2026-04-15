import { useState } from 'react'

/**
 * Collapsible
 * Props:
 *   summary: ReactNode  — always-visible trigger label
 *   children: ReactNode — hidden content
 *   defaultOpen?: boolean
 */
export default function Collapsible({ summary, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
      <div className="overflow-hidden border-t border-dotted border-cream/12">
      <button
        onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-0 py-4 text-left transition-colors"
      >
        <span className="type-card-title font-display font-semibold text-black">{summary}</span>
          <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
            className={`shrink-0 text-cream/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
          <div className="space-y-6 border-t border-dotted border-cream/15 px-0 py-5">
          {children}
        </div>
      )}
    </div>
  )
}
