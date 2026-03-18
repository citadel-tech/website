# Coinswap Website — Claude Code Briefing

## Stack
- React 18 + Vite
- Tailwind CSS (utility-first, no component library)
- React Router v6
- react-syntax-highlighter (code blocks)
- No framer-motion unless explicitly asked

## Design Tokens
```css
--navy:   #0D1B2A   /* page backgrounds */
--blue:   #1E3A8A   /* section headers, borders */
--blue-l: #3B82F6   /* interactive states, links */
--orange: #F7931A   /* primary CTAs, badges */
--cream:  #F5F0EB   /* body text on dark backgrounds */
--amber:  #FBBF24   /* caution/warning badges */
```

## Typography
- Display: `Space Grotesk` (Google Fonts)
- Body: `Inter` (Google Fonts)
- Code: `JetBrains Mono` (Google Fonts)

## Routing
| Path            | Component     |
|-----------------|---------------|
| `/`             | Home          |
| `/how-it-works` | HowItWorks    |
| `/takers`       | Takers        |
| `/makers`       | Makers        |
| `/apps`         | AppsTools     |
| `*`             | NotFound      |

## Project Structure
```
src/
├── components/
│   ├── layout/    Header.jsx, Footer.jsx, Layout.jsx
│   ├── ui/        Button.jsx, Badge.jsx, Card.jsx, CodeBlock.jsx,
│   │              TabGroup.jsx, Collapsible.jsx
│   └── home/      Hero.jsx, StatusBanner.jsx, RoleCards.jsx,
│                  SwapFlowDiagram.jsx, QuickLinks.jsx
├── pages/         Home.jsx, HowItWorks.jsx, Takers.jsx,
│                  Makers.jsx, AppsTools.jsx, NotFound.jsx
├── constants/     links.js
├── hooks/         useLatestRelease.js (optional, GitHub API)
└── assets/icons/
docs/
├── takers-content.md
├── makers-content.md
└── protocol-content.md
```

## Protocol Accuracy (never get these wrong)
- Tor is **required** in production — taker connects to maker `.onion` addresses via Socks5 proxy
- Minimum **2 makers** per swap (enforced at the protocol level, will error if < 2)
- Binary names: `makerd` (daemon), `taker` (client), `maker-cli` (control), `directoryd` (tracker/DNS)
- Default data dirs: `~/.coinswap/taker/` and `~/.coinswap/maker/`
- Wallet is **encrypted** — passphrase prompted on first run
- Taproot + Musig2 — swap transactions look like ordinary single-sig spends on-chain
- Fidelity bonds are timelocked UTXOs; makers must post one before `directoryd` will register them
- Refund safety: REFUND_LOCKTIME = 20 blocks, +20 blocks per additional hop

## Real Fee Example (use this on the Takers page)
2 makers, 3 tx splits, 500,000 sat input:
- Maker 1 takes: ~36,500 sat (fee + mining)
- Maker 2 takes: ~24,858 sat (fee + mining)
- Taker receives: ~438,642 sat

## Key Constraints (coding)
- No `<form>` tags — use onClick handlers
- All external URLs come from `src/constants/links.js`, never hardcoded
- CodeBlock.jsx wraps react-syntax-highlighter with copy button
- StatusBanner: orange badge for Mutinynet live, amber badge for mainnet warning
- Collapsible.jsx used for the "Technical Details" tier on HowItWorks page
- TabGroup.jsx used for Docker / CLI / GUI install tabs on Takers and Makers pages

## External Links
See `src/constants/links.js` — all URLs defined there. Key ones:
- coinswap_repo: https://github.com/citadel-tech/coinswap
- protocol_spec: https://github.com/citadel-tech/Coinswap-Protocol-Specification
- releases: https://github.com/citadel-tech/coinswap/releases
- mutinynet: https://mutinynet.com/
- mutinynet_faucet: https://faucet.mutinynet.com/

## Page Content
Full copy and CLI commands for each page live in:
- `docs/takers-content.md`
- `docs/makers-content.md`
- `docs/protocol-content.md`

Read the relevant doc before building that page.

## SEO
Each page needs its own `<title>` and `<meta name="description">`.
Add Open Graph tags on Home only.

## DO NOT
- Hardcode any GitHub URLs outside links.js
- Use any CSS framework other than Tailwind
- Add analytics or cookies
- Build a full docs site — link to GitHub for docs