import { useState, useEffect } from 'react'
import DocsSidebar from '../components/docs/DocsSidebar.jsx'
import DocsContent from '../components/docs/DocsContent.jsx'

export default function Docs() {
  const [activeDoc, setActiveDoc] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.title = 'Docs | CoinSwap'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'CoinSwap documentation -- manuals, protocol specifications, code examples, FFI bindings, and GUI guides for the privacy-preserving Bitcoin swap protocol.')
    }
  }, [])

  // Close mobile sidebar when selecting a doc
  function handleSelect(doc) {
    setActiveDoc(doc)
    setSidebarOpen(false)
  }

  const activeUrl = activeDoc ? activeDoc.url : null
  const currentTitle = activeDoc ? activeDoc.label : 'Get Started'

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)]">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-[4.5rem] left-0 right-0 z-30 border-b border-dotted border-black/12 bg-[#f7f2e8]/95 backdrop-blur-sm md:hidden">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="flex w-full items-center gap-3 px-4 py-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-black/50">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="font-mono text-sm font-semibold text-black/70">{currentTitle}</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[4.5rem] bottom-0 left-0 z-20 w-[260px] shrink-0
          border-r border-dotted border-black/12 bg-[#f7f2e8]/98
          transition-transform duration-200
          md:sticky md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <DocsSidebar activeUrl={activeUrl} onSelect={handleSelect} />
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10 mt-[3.25rem] md:mt-0">
        <div className="mx-auto max-w-3xl">
          <DocsContent activeDoc={activeDoc} />
        </div>
      </div>
    </div>
  )
}
