import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

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
    <header className="sticky top-0 z-50 border-b border-blue-l/20 bg-black/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex min-h-[5rem] items-center justify-between px-4 sm:px-6 lg:px-8">

        <NavLink to="/" className="group flex items-center">
          <span className="leading-none">
            <span className="block font-display text-[1.8rem] font-semibold tracking-[0.12em] text-cream sm:text-[2rem]">
              <span className="text-cream">coin</span><span className="text-orange">swap</span>
            </span>
            <span className="block text-[11px] font-mono uppercase tracking-[0.3em] text-cream/42 sm:text-xs">
              privacy over pathing
            </span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-2 border border-white/8 bg-[rgba(6,9,14,0.82)] px-3 py-2.5">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `border px-3.5 py-2 text-sm uppercase tracking-[0.16em] font-mono transition duration-200 ${
                  isActive
                    ? 'border-green/30 bg-green/10 text-green'
                    : 'border-transparent text-cream/55 hover:border-white/10 hover:bg-blue-l/8 hover:text-cream'
                }`
              }
            >
              {({ isActive }) => <span className={isActive ? 'text-green' : ''}>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/takers"
            className="inline-flex items-center border border-orange bg-orange px-5 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffae4d]"
          >
            ./get_started
          </Link>
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden border border-green/20 bg-green/6 p-2 text-green/70 transition-colors hover:text-green"
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
        <div className="md:hidden border-t border-blue-l/15 bg-[linear-gradient(180deg,rgba(2,2,2,0.98),rgba(5,10,18,0.98))]">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm uppercase tracking-[0.16em] font-mono border transition-colors ${
                    isActive
                      ? 'border-green/35 bg-green/8 text-green'
                      : 'border-white/6 text-cream/55 hover:border-blue-l/25 hover:text-cream'
                  }`
                }
              >
                {({ isActive }) => <span className={isActive ? 'text-green' : ''}>{label}</span>}
              </NavLink>
            ))}
            <Link
              to="/takers"
              className="mt-3 border border-orange bg-orange px-4 py-3.5 text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition duration-200 hover:bg-[#ffae4d]"
            >
              ./get_started
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
