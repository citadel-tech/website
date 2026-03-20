import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Minimal dark theme using design tokens
const theme = {
  'code[class*="language-"]': {
    color: '#F5F5F5',
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
  comment:   { color: '#7a7a7a' },
  punctuation: { color: '#b4b4b4' },
  property:  { color: '#f5f5f5' },
  string:    { color: '#d8d8d8' },
  number:    { color: '#ededed' },
  keyword:   { color: '#ffffff' },
  operator:  { color: '#b4b4b4' },
  function:  { color: '#f0f0f0' },
  'class-name': { color: '#ffffff' },
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
    <div className="relative overflow-hidden border border-dotted border-black/20 bg-[#fbf8f2]">
      <div className="flex items-center justify-between border-b border-dotted border-black/15 px-4 py-2">
        <span className="text-black/45 text-sm font-mono uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-sm font-body text-black/45 transition-colors hover:text-black"
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

      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter language={language} style={theme} PreTag="div">
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
