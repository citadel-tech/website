import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Minimal dark theme using design tokens
const theme = {
  'code[class*="language-"]': {
    color: '#edf3ff',
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
  comment:   { color: '#6f8c76' },
  punctuation: { color: '#9bb0c5' },
  property:  { color: '#edf3ff' },
  string:    { color: '#fbbf24' },
  number:    { color: '#f7931a' },
  keyword:   { color: '#00ff66' },
  operator:  { color: '#9bb0c5' },
  function:  { color: '#7ec8ff' },
  'class-name': { color: '#edf3ff' },
}

export default function CodeBlock({ code, language = 'bash', className = '', wrapLongLines = false }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch(() => {
          // Clipboard write failed — attempt fallback
          try {
            const ta = document.createElement('textarea')
            ta.value = code
            ta.setAttribute('readonly', '')
            ta.style.position = 'absolute'
            ta.style.left = '-9999px'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch (e) {
            console.warn('Clipboard copy failed', e)
          }
        })
    } else {
      // Fallback for older browsers
      try {
        const ta = document.createElement('textarea')
        ta.value = code
        ta.setAttribute('readonly', '')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        console.warn('Clipboard API not available', e)
      }
    }
  }

  return (
    <div className={`relative overflow-hidden border border-dotted border-[#00ff66]/24 bg-[#05080d] ${className}`}>
      <div className="flex items-center justify-between border-b border-dotted border-[#00ff66]/18 bg-[linear-gradient(90deg,rgba(0,255,102,0.05),rgba(247,147,26,0.03))] px-4 py-2">
        <span className="type-ui text-[#00ff66]/78 font-mono uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="type-ui flex items-center gap-1.5 font-body text-[#edf3ff]/55 transition-colors hover:text-[#edf3ff]"
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
        <SyntaxHighlighter language={language} style={theme} PreTag="div" wrapLongLines={wrapLongLines}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
