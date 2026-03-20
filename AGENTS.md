# Coinswap Website - Codex Context

## Project Overview
- This repo is the marketing and documentation site for CoinSwap, a privacy-preserving Bitcoin swap protocol built on Taproot + MuSig2.
- It is a static React app deployed to GitHub Pages. There is no backend or OpenAI integration in the current codebase.
- Treat this as a public-facing product site: correctness, readability, and protocol accuracy matter more than shipping flashy features quickly.

## Current Stack
- React 19
- Vite 7
- React Router 7
- Tailwind CSS v4
- `react-syntax-highlighter` for code blocks
- Deployment: GitHub Pages via GitHub Actions

## Scripts
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run deploy`

## Live App Shape
- Routes:
  - `/` -> Home
  - `/how-it-works` -> HowItWorks
  - `/takers` -> Takers
  - `/makers` -> Makers
  - `/apps` -> AppsTools
  - `*` -> NotFound
- Layout is shared through `src/components/layout/Layout.jsx` and wraps `MotionBackground`, `Header`, `Footer`, and the routed page content.

## Design Language
- The site uses a dark terminal/cyberpunk aesthetic, not a generic SaaS style.
- Fonts:
  - Display: `Chakra Petch`
  - Body: `Inter`
  - Mono: `JetBrains Mono`
- Core CSS tokens are defined in `src/index.css`:
  - `--navy: #010101`
  - `--blue: #0a1020`
  - `--blue-l: #3b82f6`
  - `--orange: #f7931a`
  - `--green: #00ff66`
  - `--cream: #edf3ff`
  - `--amber: #fbbf24`
- Reuse the existing visual motifs when extending the site:
  - terminal copy and monospace labels
  - green/orange/blue glow accents
  - panel borders, scan lines, radial gradients, and subtle motion backgrounds

## Repo Conventions
- All external URLs must come from `src/constants/links.js`. Do not hardcode GitHub or other external links elsewhere.
- Each page owns its own `<title>` and `<meta name="description">`.
- Open Graph tags are currently added on Home only.
- `CodeBlock.jsx` is the shared wrapper for code snippets.
- `TabGroup.jsx` is used for the Takers and Makers install/deployment tabs.
- `Collapsible.jsx` is used for the technical deep dive on the How It Works page.
- `StatusBanner.jsx` shows the live Mutinynet status and the mainnet caution banner.
- `useLatestRelease.js` calls the GitHub releases API for `citadel-tech/coinswap` and powers the Home hero release badge.

## Important Reality Checks
- `CLAUDE.md` is useful as historical reference, but some details in it are stale.
- The old memory entry described this repo as an empty scaffold; that is no longer true.
- `README.md` still mentions a `docs/` content source, but there is no `docs/` directory in the current repo. The page copy now lives directly in the React page components.
- When in doubt, trust the live code over older project notes.

## Protocol Facts To Preserve
- CoinSwap is non-custodial, atomic, and multi-hop.
- Production networking is Tor-only. Makers are reached via `.onion` addresses over a local SOCKS5 proxy.
- Minimum practical flow shown across the site uses 2 makers.
- Core binaries referenced across the site:
  - `taker`
  - `makerd`
  - `maker-cli`
  - `directoryd`
- Default data directories:
  - `~/.coinswap/taker/`
  - `~/.coinswap/maker/`
- Makers must post a fidelity bond before directory registration.
- Refund safety examples use:
  - `REFUND_LOCKTIME = 20 blocks`
  - `REFUND_LOCKTIME_STEP = 20 blocks`
- Canonical fee example used on the site:
  - 2 makers
  - 3 tx splits
  - 500,000 sat input
  - Maker 1 total cost: ~36,500 sat
  - Maker 2 total cost: ~24,858 sat
  - Taker receives: ~438,642 sat

## Main Files Worth Reading Before Editing
- `README.md`
- `src/App.jsx`
- `src/index.css`
- `src/constants/links.js`
- `src/components/layout/*`
- `src/components/home/*`
- `src/pages/Home.jsx`
- `src/pages/HowItWorks.jsx`
- `src/pages/Takers.jsx`
- `src/pages/Makers.jsx`
- `src/pages/AppsTools.jsx`

## Working Guidance
- Preserve the current tone: technical, confident, privacy-focused, and builder-friendly.
- Favor direct edits to the existing page components over introducing extra abstractions unless repetition is becoming painful.
- Keep mobile behavior in mind; the site already has a responsive header, tables, and stacked sections.
- For any protocol or ops copy, prefer consistency with existing page content unless you are explicitly correcting verified inaccuracies.
