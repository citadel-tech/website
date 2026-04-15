import { LINKS } from '../../constants/links'

export default function StatusBanner({ releaseTag, releaseUrl }) {
  return (
    <div className="border-b border-dotted border-cream/10 bg-cream/[0.02]">
      <div className="site-shell flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
        <div className="type-caption flex flex-wrap items-center gap-3 font-mono uppercase tracking-[0.14em]">
          {releaseTag && releaseUrl && (
            <a
              href={releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-orange/20 bg-orange/[0.08] px-3.5 py-2 text-cream/90 transition-all duration-200 hover:bg-orange/15 hover:border-orange/35"
            >
              LATEST: {releaseTag} ↗
            </a>
          )}

          <span className="inline-flex items-center gap-2 rounded-md border border-cream/10 bg-cream/[0.04] px-3.5 py-2 text-cream/80">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            </span>
            STATUS: LIVE ON MUTINYNET
          </span>

          <a
            href={LINKS.coinswap_repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-cream/10 bg-cream/[0.03] px-3.5 py-2 text-cream/70 transition-all duration-200 hover:bg-cream/[0.06] hover:border-cream/20"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 text-amber">
              <path fill="currentColor" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" />
            </svg>
            STAR US ON GITHUB
          </a>
        </div>
      </div>
    </div>
  )
}
