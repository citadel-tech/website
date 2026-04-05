import { useEffect, useState } from 'react'

export default function SidebarSection({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    if (defaultOpen) {
      setOpen(true)
    }
  }, [defaultOpen])

  return (
    <div className="border-b border-dotted border-cream/12">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between px-4 py-3 font-mono text-lg font-semibold uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-cream"
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {open && (
        <div className="pb-2 pl-4">
          {children}
        </div>
      )}
    </div>
  )
}
