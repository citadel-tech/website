import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import CoinSwapLogo from '../brand/CoinSwapLogo'

const THEME_STORAGE_KEY = 'coinswap-theme'

const NAV_LINKS = [
  { to: '/',             label: 'home' },
  { to: '/how-it-works', label: 'how-it-works' },
  { to: '/takers',       label: 'takers' },
  { to: '/makers',       label: 'makers' },
  { to: '/docs',         label: 'docs' },
]

function resolveInitialTheme() {
  if (typeof window === 'undefined') return 'light'

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
      <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
      <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
    </svg>
  )
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors hover:text-black"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(resolveInitialTheme)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <header className="app-header sticky top-0 z-50 border-b border-dotted border-black/15 backdrop-blur-sm">
      <div className="site-shell flex min-h-18 items-center justify-between gap-6">

        <NavLink to="/" className="group flex items-center gap-3">
          <CoinSwapLogo className="h-10 w-10 shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.12)]" />
          <span className="leading-none">
            <span className="type-brand block font-display font-semibold tracking-[0.04em] text-black">
              <span className="text-black">CoinSwap</span>
            </span>
            <span className="type-caption mt-2 block font-mono uppercase tracking-[0.18em] text-black/42">
              Make Bitcoin Fungible Again
            </span>
          </span>
        </NavLink>

        <div className="ml-auto hidden items-center gap-3 md:flex lg:gap-4">
          <nav className="flex items-center justify-end gap-8 lg:gap-10 xl:gap-12">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `type-ui inline-flex rounded-lg px-3 py-2 font-mono font-semibold uppercase tracking-[0.12em] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f7931a]/12 hover:shadow-[0_16px_34px_rgba(247,147,26,0.22)] underline decoration-transparent underline-offset-[0.35em] decoration-2 ${
                    isActive
                      ? 'text-black decoration-black/45'
                      : 'text-black/55 hover:text-black hover:decoration-[#f7931a]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="p-2 text-black/70 transition-colors hover:text-black"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="app-header-mobile md:hidden border-t border-dotted border-black/15">
          <nav className="site-shell flex flex-col gap-2 py-4">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `type-ui inline-flex rounded-lg px-3 py-3 font-mono font-semibold uppercase tracking-[0.12em] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f7931a]/12 hover:shadow-[0_16px_34px_rgba(247,147,26,0.22)] underline decoration-transparent underline-offset-[0.35em] decoration-2 ${
                    isActive
                      ? 'text-black decoration-black/45'
                      : 'text-black/55 hover:text-black hover:decoration-[#f7931a]'
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
