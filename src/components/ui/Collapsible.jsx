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
    <div className="border border-blue/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-blue/5 hover:bg-blue/10 transition-colors"
      >
        <span className="font-display font-semibold text-cream text-base">{summary}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-cream/40 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="px-5 py-5 border-t border-blue/20 space-y-6">
          {children}
        </div>
      )}
    </div>
  )
}
