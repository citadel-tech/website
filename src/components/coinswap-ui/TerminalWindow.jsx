import { useState, useEffect, useRef } from 'react'

/**
 * @param {'green' | 'orange'} [accent] — taker vs maker chrome
 */
export default function TerminalWindow({ commands, title = 'Terminal', accent = 'green' }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const bodyRef = useRef(null)
  const isOrange = accent === 'orange'

  useEffect(() => {
    if (visibleLines < commands.length) {
      const delay = commands[visibleLines]?.delay || 120
      const timer = setTimeout(() => setVisibleLines(v => v + 1), delay)
      return () => clearTimeout(timer)
    }
  }, [visibleLines, commands])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [visibleLines])

  const frame =
    isOrange
      ? 'rounded-2xl border border-orange/45 bg-gradient-to-b from-orange/[0.07] to-transparent shadow-[0_0_0_1px_rgba(255,94,0,0.12),0_12px_48px_rgba(255,94,0,0.12),0_32px_64px_rgba(0,0,0,0.35)]'
      : 'rounded-2xl border border-green/45 bg-gradient-to-b from-green/[0.06] to-transparent shadow-[0_0_0_1px_rgba(0,255,157,0.12),0_12px_48px_rgba(0,255,157,0.1),0_32px_64px_rgba(0,0,0,0.35)]'

  const headerRule = isOrange
    ? 'border-b border-orange/25 bg-gradient-to-r from-orange/[0.12] via-cream/[0.04] to-orange/[0.08]'
    : 'border-b border-green/25 bg-gradient-to-r from-green/[0.12] via-cream/[0.04] to-green/[0.08]'

  const promptClass = isOrange
    ? 'text-orange drop-shadow-[0_0_8px_rgba(255,94,0,0.45)]'
    : 'text-green drop-shadow-[0_0_8px_rgba(0,255,157,0.45)]'

  const cursorClass = isOrange
    ? 'bg-orange shadow-[0_0_10px_rgba(255,94,0,0.65)]'
    : 'bg-green shadow-[0_0_10px_rgba(0,255,157,0.65)]'

  return (
    <div
      data-terminal-accent={accent}
      className={`terminal-window relative w-full max-w-4xl mx-auto overflow-hidden backdrop-blur-sm ${frame}`}
    >
      <div
        className={`terminal-header relative flex items-center px-4 py-3 ${headerRule}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/25 to-transparent" />
        <div className="flex gap-2 absolute left-4 z-10">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.5)] ring-1 ring-black/20" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.45)] ring-1 ring-black/15" />
          <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.45)] ring-1 ring-black/15" />
        </div>
        <div className="mx-auto flex-1 text-center font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--terminal-title)]">
          {title}
        </div>
      </div>

      <div
        ref={bodyRef}
        className="terminal-body relative min-h-[280px] max-h-[400px] overflow-y-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-[var(--terminal-text)] sm:text-sm"
      >
        <div className="terminal-scanline pointer-events-none absolute inset-0 z-10 opacity-70" />
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-cream/[0.03] to-transparent" />

        <div className="relative z-20 space-y-1.5">
          {commands.slice(0, visibleLines).map((line, idx) => (
            <div
              key={idx}
              className={`transition-all duration-300 ${
                idx === visibleLines - 1 ? 'animate-[fadeSlideIn_0.35s_ease-out]' : ''
              } ${
                line.type === 'error'
                  ? 'text-[var(--terminal-error)]'
                  : line.type === 'success'
                    ? 'text-[var(--terminal-success)]'
                    : line.type === 'info'
                      ? 'text-[var(--terminal-info)]'
                      : 'text-[var(--terminal-text)]'
              }`}
            >
              {line.type === 'input' ? (
                <>
                  <span className={`mr-2 ${promptClass}`}>❯</span>
                  <span className="text-[var(--terminal-strong)] font-medium">{line.text}</span>
                </>
              ) : (
                <>
                  <span className="mr-3 select-none text-[var(--terminal-muted)]">│</span>
                  {line.text}
                </>
              )}
            </div>
          ))}

          <div className="text-[var(--terminal-strong)]">
            <span className={`mr-2 ${promptClass}`}>❯</span>
            <span className={`cursor-blink inline-block h-4 w-2 translate-y-0.5 rounded-[1px] ${cursorClass}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
