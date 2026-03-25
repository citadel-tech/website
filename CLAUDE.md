# Coinswap Website - Claude Code Briefing

## Project Overview
- This repo is the marketing and documentation site for CoinSwap, a privacy-preserving Bitcoin swap protocol built on Taproot + MuSig2.
- It is a static React app deployed to GitHub Pages.
- There is no backend and no OpenAI integration in the current codebase.
- Treat this as a public-facing protocol site where accuracy and clarity matter more than adding generic product-site patterns.

## Stack
- React 19 + Vite 7
- Tailwind CSS v4
- React Router v7
- `react-syntax-highlighter` for shared code blocks
- Deployed via GitHub Pages and GitHub Actions

## Design Tokens
```css
--navy:   #010101
--blue:   #0a1020
--blue-l: #3b82f6
--orange: #f7931a
--green:  #00ff66
--cream:  #edf3ff
--amber:  #fbbf24
```

## Typography
- Display: `Chakra Petch`
- Body: `Inter`
- Code: `JetBrains Mono`

## Design Language
- Dark terminal/cyberpunk visual system
- Green, orange, and blue accent glow
- Monospace labels and CLI-flavored copy
- Layered gradients, scan lines, panel borders, and subtle motion backgrounds
- Avoid turning the site into a generic SaaS landing page

## Routing
| Path            | Component     |
|-----------------|---------------|
| `/`             | Home          |
| `/how-it-works` | HowItWorks    |
| `/takers`       | Takers        |
| `/makers`       | Makers        |
| `/docs`         | Docs          |
| `*`             | NotFound      |

## Project Structure
```text
src/
├── components/
│   ├── home/      Hero.jsx, QuickLinks.jsx, RoleCards.jsx,
│   │              StatusBanner.jsx, SwapFlowDiagram.jsx
│   ├── layout/    Footer.jsx, Header.jsx, Layout.jsx, MotionBackground.jsx
│   └── ui/        Badge.jsx, Button.jsx, Card.jsx, CodeBlock.jsx,
│                  Collapsible.jsx, TabGroup.jsx
├── constants/     links.js
├── hooks/         useLatestRelease.js
├── pages/         Docs.jsx, Home.jsx, HowItWorks.jsx,
│                  Makers.jsx, NotFound.jsx, Takers.jsx
├── App.jsx
├── index.css
└── main.jsx
memory/
├── MEMORY.md
└── project_coinswap.md
```

## Protocol Accuracy
- CoinSwap is non-custodial, atomic, and multi-hop.
- Production networking is Tor-only.
- Makers are reached through `.onion` addresses over a local SOCKS5 proxy.
- Core binaries referenced on the site:
  - `taker`
  - `makerd`
  - `maker-cli`
  - `directoryd`
- Default data dirs:
  - `~/.coinswap/taker/`
  - `~/.coinswap/maker/`
- Makers must post a fidelity bond before `directoryd` will register them.
- Refund examples use:
  - `REFUND_LOCKTIME = 20 blocks`
  - `REFUND_LOCKTIME_STEP = 20 blocks`
- Taproot + MuSig2 language is intentional and should stay consistent.

## Canonical Fee Example
2 makers, 3 tx splits, 500,000 sat input:
- Maker 1 total cost: ~36,500 sat
- Maker 2 total cost: ~24,858 sat
- Taker receives: ~438,642 sat

## Current Repo Conventions
- All external URLs must come from `src/constants/links.js`. Never hardcode external links elsewhere.
- Each page should define its own `<title>` and `<meta name="description">`.
- Open Graph tags are currently added on Home only.
- `CodeBlock.jsx` is the shared code snippet wrapper.
- `TabGroup.jsx` is used for the Takers and Makers install/deployment tabs.
- `Collapsible.jsx` is used for the technical details section on How It Works.
- `StatusBanner.jsx` shows live Mutinynet status and the mainnet caution banner.
- `useLatestRelease.js` fetches the latest GitHub release for `citadel-tech/coinswap`.

## Reality Checks
- Older notes that describe this repo as an empty scaffold are outdated.
- `README.md` still mentions a `docs/` content source, but there is no `docs/` directory in the current repo.
- The page copy currently lives directly inside the React page components.
- When live code and older notes disagree, trust the live code.

## SEO
- Every page needs its own `<title>` and `<meta name="description">`.
- Keep Open Graph tags on Home unless there is a deliberate reason to expand them.

## Working Guidance
- Keep the current tone technical, confident, privacy-focused, and builder-friendly.
- Prefer editing the existing page components directly over adding abstractions too early.
- Preserve mobile responsiveness when changing layouts, tables, or navigation.
- For protocol or operational claims, stay consistent with the existing site unless you are explicitly correcting verified inaccuracies.

## Do Not
- Hardcode any external URLs outside `src/constants/links.js`
- Add analytics, cookies, or marketing popups
- Introduce a backend unless explicitly asked
- Assume the historical `docs/` content files still exist
- Replace the established terminal/cyberpunk design language with a generic template
