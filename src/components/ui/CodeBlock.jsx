import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Minimal dark theme using design tokens
const theme = {
  'code[class*="language-"]': {
    color: '#F5F0EB',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.875rem',
    lineHeight: '1.6',
    background: 'none',
  },
  'pre[class*="language-"]': {
    background: 'none',
    margin: 0,
    padding: 0,
    overflow: 'auto',
  },
  comment:   { color: '#6b7280' },
  punctuation: { color: '#9ca3af' },
  property:  { color: '#F7931A' },
  string:    { color: '#86efac' },
  number:    { color: '#FBBF24' },
  keyword:   { color: '#93c5fd' },
  operator:  { color: '#9ca3af' },
  function:  { color: '#c4b5fd' },
  'class-name': { color: '#67e8f9' },
}

export default function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative rounded-lg bg-[#0a1520] border border-blue/30 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-blue/20 bg-blue/10">
        <span className="text-cream/30 text-xs font-mono uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs font-body text-cream/40 hover:text-cream transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter language={language} style={theme} PreTag="div">
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
