import { Link } from 'react-router-dom'
import { marked } from 'marked'
import CodeBlock from '../ui/CodeBlock.jsx'
import { useDocContent } from '../../hooks/useDocContent.js'

function resolveDocUrl(baseUrl, target) {
  if (!target) return target

  try {
    return new URL(target, baseUrl).toString()
  } catch {
    return target
  }
}

function shouldResolveUrl(target) {
  if (!target) return false

  return !/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)
}

function resolveHtmlAssetUrls(html, baseUrl) {
  return html.replace(
    /\b(src|href)=("([^"]*)"|'([^']*)')/gi,
    (match, attr, quotedValue, doubleQuoted, singleQuoted) => {
      const value = doubleQuoted ?? singleQuoted ?? ''

      if (!shouldResolveUrl(value)) return match

      const resolved = resolveDocUrl(baseUrl, value)
      const quote = quotedValue[0]
      return `${attr}=${quote}${resolved}${quote}`
    }
  )
}

function renderMarkdown(content, baseUrl) {
  const renderer = new marked.Renderer()

  renderer.image = ({ href, title, text }) => {
    const src = resolveDocUrl(baseUrl, href)
    const titleAttr = title ? ` title="${title}"` : ''
    const alt = text ?? ''
    return `<img src="${src}" alt="${alt}"${titleAttr} />`
  }

  renderer.link = function ({ href, title, tokens }) {
    const resolvedHref = resolveDocUrl(baseUrl, href)
    const titleAttr = title ? ` title="${title}"` : ''
    const text = this.parser.parseInline(tokens)
    return `<a href="${resolvedHref}"${titleAttr}>${text}</a>`
  }

  const html = marked(content, { gfm: true, breaks: false, renderer })
  return resolveHtmlAssetUrls(html, baseUrl)
}

function GitHubLink({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-sm text-black/65 underline decoration-black/20 underline-offset-[0.18em] transition-colors hover:text-black hover:decoration-black/50"
    >
      View on GitHub
      <span aria-hidden="true">&rarr;</span>
    </a>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3 py-16 text-black/45">
      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span className="font-mono text-sm uppercase tracking-wider">Loading...</span>
    </div>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className="border border-dotted border-red-400/40 bg-red-50/50 px-5 py-4">
      <p className="font-mono text-sm text-red-700">
        Failed to load document: {message}
      </p>
    </div>
  )
}

function GetStartedPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="type-page-title font-display font-semibold text-black">
          CoinSwap Documentation
        </h1>
        <p className="type-body mt-4 max-w-2xl text-black/65">
          Everything you need to understand, deploy, and build on the CoinSwap protocol —
          a non-custodial, atomic, multi-hop Bitcoin swap system built on Taproot and MuSig2.
        </p>
      </div>

      <div className="border-t border-dotted border-black/15 pt-6">
        <h2 className="type-section-title font-display font-semibold text-black">
          Core Concepts
        </h2>
        <dl className="mt-4 space-y-4 type-body text-black/70">
          <div>
            <dt className="font-mono text-sm font-semibold uppercase tracking-wider text-black/50">Takers</dt>
            <dd className="mt-1">
              Users who initiate swaps. The <code className="inline-code">taker</code> binary connects
              to makers over Tor, negotiates fees, and executes atomic multi-hop swaps.{' '}
              <Link to="/takers" className="simple-link">Learn more</Link>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-sm font-semibold uppercase tracking-wider text-black/50">Makers</dt>
            <dd className="mt-1">
              Liquidity providers that run <code className="inline-code">makerd</code> as a Tor hidden service.
              Makers post fidelity bonds and earn fees for providing swap liquidity.{' '}
              <Link to="/makers" className="simple-link">Learn more</Link>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-sm font-semibold uppercase tracking-wider text-black/50">Directory Server</dt>
            <dd className="mt-1">
              The <code className="inline-code">directoryd</code> binary maintains a public list of
              registered makers and their fidelity bonds. Takers query the directory to discover available makers.
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-dotted border-black/15 pt-6">
        <h2 className="type-section-title font-display font-semibold text-black">
          Getting Started
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Run a Taker', desc: 'Start swapping with the CLI', section: 'manuals', item: 'Taker' },
            { label: 'Deploy a Maker', desc: 'Provide liquidity and earn fees', section: 'manuals', item: 'Makerd' },
            { label: 'Protocol Specs', desc: 'Understand the cryptographic protocol', section: 'protocol-specs' },
            { label: 'FFI Bindings', desc: 'Build apps in JS, Python, Kotlin, Swift, or Ruby', section: 'ffis' },
          ].map(card => (
            <div
              key={card.label}
              className="border border-dotted border-black/12 bg-white/30 px-5 py-4 transition-colors hover:border-black/25"
            >
              <p className="font-mono text-sm font-semibold text-black">{card.label}</p>
              <p className="mt-1 text-sm text-black/55">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-dotted border-black/15 pt-6">
        <p className="type-small text-black/50">
          Use the sidebar to navigate through manuals, protocol specifications, code examples,
          FFI bindings, and GUI documentation.
        </p>
      </div>
    </div>
  )
}

function MarkdownContent({ url, repoUrl }) {
  const { content, loading, error } = useDocContent(url)

  if (loading) return <LoadingSpinner />
  if (error)   return <ErrorMessage message={error} />
  if (!content) return null

  const html = renderMarkdown(content, url)

  return (
    <div>
      {repoUrl && (
        <div className="mb-6">
          <GitHubLink url={repoUrl} />
        </div>
      )}
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

function CodeContent({ url, lang, repoUrl, label }) {
  const { content, loading, error } = useDocContent(url)

  if (loading) return <LoadingSpinner />
  if (error)   return <ErrorMessage message={error} />
  if (!content) return null

  return (
    <div>
      {repoUrl && (
        <div className="mb-6">
          <GitHubLink url={repoUrl} />
        </div>
      )}
      {label && (
        <h2 className="type-card-title mb-4 font-display font-semibold text-black">{label}</h2>
      )}
      <CodeBlock code={content} language={lang} />
    </div>
  )
}

export default function DocsContent({ activeDoc }) {
  if (!activeDoc) return <GetStartedPanel />

  if (activeDoc.lang) {
    return (
      <CodeContent
        url={activeDoc.url}
        lang={activeDoc.lang}
        repoUrl={activeDoc.repoUrl}
        label={activeDoc.label}
      />
    )
  }

  return <MarkdownContent url={activeDoc.url} repoUrl={activeDoc.repoUrl} />
}
