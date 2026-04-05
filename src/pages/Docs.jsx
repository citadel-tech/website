import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import DocsSidebar from '../components/docs/DocsSidebar'
import DocsContent from '../components/docs/DocsContent'
import { findDocById } from '../constants/docsNav'

export default function Docs() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeDocId = searchParams.get('doc')
  const activeDoc = findDocById(activeDocId)

  useEffect(() => {
    document.title = 'Docs | CoinSwap'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'CoinSwap documentation — manuals, protocol specifications, code examples, FFI bindings, and GUI guides for the privacy-preserving Bitcoin swap protocol.')
    }
  }, [])

  // Close mobile sidebar when selecting a doc
  function handleSelect(doc) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (doc?.docId) {
      nextSearchParams.set('doc', doc.docId)
    } else {
      nextSearchParams.delete('doc')
    }

    setSearchParams(nextSearchParams)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentTitle = activeDoc ? activeDoc.label : 'Get Started'

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)]">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-[4.5rem] left-0 right-0 z-30 border-b border-dotted border-cream/12 bg-navy/95 backdrop-blur-sm md:hidden">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="flex w-full items-center gap-3 px-4 py-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-cream/50">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="font-mono text-sm font-semibold text-cream/70">{currentTitle}</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[4.5rem] bottom-0 left-0 z-20 w-[260px] shrink-0
          border-r border-dotted border-cream/12 bg-navy/98
          transition-transform duration-200
          md:sticky md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <DocsSidebar activeDocId={activeDoc ? activeDoc.docId : null} onSelect={handleSelect} />
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-navy/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 px-6 py-12 md:px-12 md:py-16 mt-[3.25rem] md:mt-0">
        <div className="mx-auto max-w-4xl">
          <DocsContent activeDoc={activeDoc} />
        </div>
      </div>
    </div>
  )
}
