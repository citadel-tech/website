import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const faviconVersion = 'coinswap-bw-v1'
const baseUrl = import.meta.env.BASE_URL
const faviconHref = `${baseUrl}coinswap-bw.svg?v=${faviconVersion}`

function applyFavicons() {
  document
    .querySelectorAll("link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']")
    .forEach(node => node.remove())

  const icon = document.createElement('link')
  icon.rel = 'icon'
  icon.type = 'image/svg+xml'
  icon.href = faviconHref

  document.head.append(icon)
}

applyFavicons()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
