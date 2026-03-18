# Coinswap Website

Marketing and documentation site for [Coinswap](https://github.com/citadel-tech/coinswap) — a privacy-preserving Bitcoin swap protocol using Taproot + Musig2.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- react-syntax-highlighter (code blocks)
- Deployed via GitHub Pages (`gh-pages`)

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build      # production build → dist/
npm run preview    # preview production build locally
npm run deploy     # build + push to gh-pages branch
```

## Project Structure

```text
src/
├── components/
│   ├── layout/    Header.jsx, Footer.jsx, Layout.jsx
│   ├── ui/        Button, Badge, Card, CodeBlock, TabGroup, Collapsible
│   └── home/      Hero, StatusBanner, RoleCards, SwapFlowDiagram, QuickLinks
├── pages/         Home, HowItWorks, Takers, Makers, AppsTools, NotFound
├── constants/     links.js   ← all external URLs live here
├── hooks/         useLatestRelease.js
└── assets/icons/
docs/              page content source (markdown)
```

## Pages

| Path            | Page          |
|-----------------|---------------|
| `/`             | Home          |
| `/how-it-works` | How It Works  |
| `/takers`       | Takers        |
| `/makers`       | Makers        |
| `/apps`         | Apps & Tools  |

## Links

All external URLs are defined in `src/constants/links.js`. Never hardcode GitHub or external URLs elsewhere.
