import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import OpenSwapLogo from '../brand/OpenSwapLogo'

const NAV_LINKS = [
  { to: '/',             label: 'home' },
  { to: '/how-it-works', label: 'how-it-works' },
  { to: '/takers',       label: 'takers' },
  { to: '/makers',       label: 'makers' },
  { to: '/market',       label: 'market' },
  { to: '/docs',         label: 'docs' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
    window.localStorage.removeItem('openswap-theme')
  }, [])

  return (
    <header className="app-header sticky top-0 z-50 border-b border-dotted border-black/15 backdrop-blur-sm">
      <div className="header-signal" aria-hidden="true" />
      <div className="site-shell flex min-h-18 items-center justify-between gap-6">

        <NavLink to="/" onClick={() => setOpen(false)} className="brand-lockup group flex items-center gap-3">
          <OpenSwapLogo className="h-10 w-10 shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.12)]" />
          <span className="leading-none">
            <span className="type-brand block font-display font-semibold tracking-[0.04em] text-black">
              <span className="text-black">OpenSwap</span>
            </span>
            <span className="type-caption mt-2 block font-mono uppercase tracking-[0.18em] text-black/65">
              Open Network for Atomic Swaps
            </span>
          </span>
        </NavLink>

        <div className="ml-auto hidden items-center md:flex">
          <nav className="primary-nav flex items-center justify-end gap-1 lg:gap-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `type-ui primary-nav__link inline-flex px-3 py-2 font-mono font-semibold uppercase tracking-[0.12em] transition duration-200 ${
                    isActive
                      ? 'text-black decoration-black/45'
                      : 'text-black/65 hover:text-black hover:decoration-[#f7931a]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

        </div>

        <div className="ml-auto flex items-center md:hidden">
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
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `type-ui inline-flex rounded-lg px-3 py-3 font-mono font-semibold uppercase tracking-[0.12em] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f7931a]/12 hover:shadow-[0_16px_34px_rgba(247,147,26,0.22)] underline decoration-transparent underline-offset-[0.35em] decoration-2 ${
                    isActive
                      ? 'text-black decoration-black/45'
                      : 'text-black/65 hover:text-black hover:decoration-[#f7931a]'
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
