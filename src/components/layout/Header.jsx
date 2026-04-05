import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import CoinSwapLogo from '../brand/CoinSwapLogo'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const s = localStorage.getItem('coinswap-theme')
      if (s === 'light') return false
      if (s === 'dark') return true
    } catch {
      /* ignore */
    }
    return document.documentElement.getAttribute('data-theme') !== 'light'
  })

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.removeAttribute('data-theme')
        localStorage.setItem('coinswap-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('coinswap-theme', 'light')
      }
    } catch {
      if (isDark) document.documentElement.removeAttribute('data-theme')
      else document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [isDark])

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className="relative ml-2 md:ml-4 inline-flex items-center gap-2 rounded-xl border border-cream/20 bg-cream/[0.04] px-3 py-2 text-cream/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-cream/[0.08] hover:border-green/35 hover:text-green transition-all duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="type-caption hidden font-mono uppercase tracking-[0.14em] text-cream/70 sm:inline">
        {isDark ? 'Dark' : 'Light'}
      </span>
      <span className="relative h-5 w-5 shrink-0 overflow-hidden text-current">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDark ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
      </span>
    </button>
  )
}

const NAV_LINKS = [
  { to: '/',             label: 'home' },
  { to: '/how-it-works', label: 'how-it-works' },
  { to: '/takers',       label: 'takers' },
  { to: '/makers',       label: 'makers' },
  { to: '/docs',         label: 'docs' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-cream/8 bg-navy/80 backdrop-blur-xl">
      <div className="site-shell flex min-h-[5rem] items-center justify-between gap-6">

        <NavLink to="/" className="group flex items-center gap-3">
          <CoinSwapLogo className="h-10 w-10 shrink-0 text-cream transition-transform duration-300 group-hover:scale-110" />
          <span className="leading-none">
            <span className="type-brand block font-display font-bold tracking-[0.04em] text-cream">
              CoinSwap
            </span>
            <span className="type-caption mt-1 block font-mono uppercase tracking-[0.15em] text-cream/50">
              Make Bitcoin Fungible Again
            </span>
          </span>
        </NavLink>

        <nav className="hidden md:flex flex-1 items-center justify-end gap-2 lg:gap-3">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `type-ui inline-flex rounded-lg px-4 py-2.5 font-mono font-semibold uppercase tracking-[0.10em] transition-all duration-300 ${
                  isActive
                    ? 'text-green bg-green/8 shadow-[inset_0_0_0_1px_rgba(0,255,157,0.2)]'
                    : 'text-cream/55 hover:text-cream hover:bg-cream/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="p-2.5 text-cream/60 transition-colors hover:text-green rounded-lg"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-cream/8 bg-navy/95 backdrop-blur-xl">
          <nav className="site-shell flex flex-col gap-2 py-6">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `type-ui inline-flex rounded-xl px-4 py-3.5 font-mono font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActive
                      ? 'text-green bg-green/8 shadow-[inset_0_0_0_1px_rgba(0,255,157,0.15)]'
                      : 'text-cream/60 hover:text-green hover:bg-green/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
