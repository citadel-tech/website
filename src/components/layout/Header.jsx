import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import CoinSwapLogo from '../brand/CoinSwapLogo'

const NAV_LINKS = [
  { to: '/',             label: 'home' },
  { to: '/how-it-works', label: 'how-it-works' },
  { to: '/takers',       label: 'takers' },
  { to: '/makers',       label: 'makers' },
  { to: '/apps',         label: 'apps' },
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
    <header className="sticky top-0 z-50 border-b border-dotted border-black/15 bg-[#f7f2e8]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex min-h-[4.5rem] items-center justify-between px-3 sm:px-4 lg:px-5">

        <NavLink to="/" className="group flex items-center gap-3">
          <CoinSwapLogo className="h-10 w-10 shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.12)]" />
          <span className="leading-none">
            <span className="block text-[1.85rem] font-display font-semibold tracking-[0.04em] text-black sm:text-[2rem]">
              <span className="text-black">CoinSwap</span>
            </span>
            <span className="mt-2 block text-[0.58rem] font-mono uppercase tracking-[0.18em] text-black/42">
              Make Bitcoin Fungible Again
            </span>
          </span>
        </NavLink>

        <nav className="hidden md:flex flex-1 items-center justify-between px-8 lg:px-10">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `py-2 text-sm font-mono font-semibold uppercase tracking-[0.12em] transition duration-200 hover:scale-105 underline decoration-transparent underline-offset-[0.35em] decoration-2 ${
                  isActive
                    ? 'text-black decoration-black/45'
                    : 'text-black/55 hover:text-black hover:decoration-black/30'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden p-2 text-black/70 transition-colors hover:text-black"
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

      {open && (
        <div className="md:hidden border-t border-dotted border-black/15 bg-[#f7f2e8]">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-0 py-3 text-sm font-mono font-semibold uppercase tracking-[0.12em] transition-transform transition-colors hover:scale-105 underline decoration-transparent underline-offset-[0.35em] decoration-2 ${
                    isActive
                      ? 'text-black decoration-black/45'
                      : 'text-black/55 hover:text-black hover:decoration-black/30'
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
