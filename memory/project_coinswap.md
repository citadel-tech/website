---
name: coinswap-website project
description: Context about the CoinSwap website project
type: project
---

This is the CoinSwap website in `/home/mojo/github/website` — a live React/Vite marketing and documentation site for the CoinSwap protocol, not an empty scaffold.

Current stack:
- React 19
- Vite 7
- React Router 7
- Tailwind CSS v4
- `react-syntax-highlighter`

Current routes:
- `/`
- `/how-it-works`
- `/takers`
- `/makers`
- `/apps`

Project notes:
- The site is static and deployed to GitHub Pages.
- There is no backend or AI integration in the current repo.
- External URLs are centralized in `src/constants/links.js`.
- Page copy currently lives in the React page components; do not assume the `docs/` directory mentioned in older notes still exists.
- The visual style is dark, terminal-inspired, and privacy/protocol focused.

Use `AGENTS.md` as the primary Codex-facing project briefing for future work, and trust the current code over older historical notes if they conflict.
