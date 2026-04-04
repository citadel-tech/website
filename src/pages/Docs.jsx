import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import DocsSidebar from '../components/docs/DocsSidebar.jsx'
import DocsContent from '../components/docs/DocsContent.jsx'
import { findDocById } from '../constants/docsNav.js'

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

  useEffect(() => {
    if (!sidebarOpen) return

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  useEffect(() => {
    setSidebarOpen(false)
  }, [activeDocId])

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
      <div className="app-docs-mobile-toggle fixed top-18 left-0 right-0 z-30 border-b border-dotted border-black/12 backdrop-blur-sm md:hidden">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          aria-expanded={sidebarOpen}
          aria-controls="docs-sidebar"
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
        id="docs-sidebar"
        className={`
          app-docs-sidebar fixed left-0 z-20 w-65 shrink-0
          top-31 h-[calc(100vh-7.75rem)]
          border-r border-dotted border-black/12
          transition-transform duration-200
          md:sticky md:top-18 md:h-[calc(100vh-4.5rem)] md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <DocsSidebar activeDocId={activeDoc ? activeDoc.docId : null} onSelect={handleSelect} />
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="mt-13 flex-1 min-w-0 px-6 py-8 md:mt-0 md:px-10 md:py-10">
        <div className="mx-auto max-w-3xl">
          <DocsContent activeDoc={activeDoc} />
        </div>
      </div>
    </div>
  )
}
