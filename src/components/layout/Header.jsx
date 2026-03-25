import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import CoinSwapLogo from '../brand/CoinSwapLogo'

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
    <header className="sticky top-0 z-50 border-b border-dotted border-black/15 bg-[#f7f2e8]/95 backdrop-blur-sm">
      <div className="site-shell flex min-h-[4.5rem] items-center justify-between gap-6">

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

        <nav className="hidden md:flex flex-1 items-center justify-end gap-8 lg:gap-10 xl:gap-12">
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
