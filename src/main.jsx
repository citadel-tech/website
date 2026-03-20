import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const faviconVersion = 'coinswap-logo-v2'
const baseUrl = import.meta.env.BASE_URL
const faviconHref = `${baseUrl}coinswap-tab.png?v=${faviconVersion}`
const faviconIcoHref = `${baseUrl}coinswap-tab.ico?v=${faviconVersion}`

function applyFavicons() {
  document
    .querySelectorAll("link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']")
    .forEach(node => node.remove())

  const icon = document.createElement('link')
  icon.rel = 'icon'
  icon.type = 'image/png'
  icon.href = faviconHref

  const shortcutIcon = document.createElement('link')
  shortcutIcon.rel = 'shortcut icon'
  shortcutIcon.href = faviconIcoHref

  document.head.append(icon, shortcutIcon)
}

applyFavicons()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
