import { useMemo, useState } from 'react'
import { Check, Copy, ExternalLink, Radio, ShieldCheck, X } from 'lucide-react'
import { LINKS } from '../../constants/links'
import OpenSwapLogo from '../brand/OpenSwapLogo'

function formatSats(value) {
  return `${Math.round(Number(value || 0)).toLocaleString()} sat`
}

function formatPct(value, digits = 4) {
  return Number(value || 0).toFixed(digits)
}

function shortenAddress(address, head = 8, tail = 7) {
  if (!address) return 'unknown'
  const clean = address.replace(/\.onion$/i, '')
  if (clean.length <= head + tail + 3) return address
  return `${clean.slice(0, head)}…${clean.slice(-tail)}.onion`
}

function makerKey(maker, index) {
  const txid = maker?.fidelity_bond?.outpoint?.txid || 'no-bond'
  return `${maker?.address || 'maker'}-${txid}-${index}`
}

function CopyAddressButton({ address, compact = false }) {
  const [copied, setCopied] = useState(false)

  async function copyAddress(event) {
    event.stopPropagation()
    if (!address) return

    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copyAddress}
      disabled={!address}
      className={compact ? 'maker-node__copy' : 'maker-inspector__copy'}
      aria-label={copied ? 'Onion address copied' : 'Copy onion address'}
      title={copied ? 'Copied' : 'Copy onion address'}
    >
      {copied ? <Check size={compact ? 11 : 15} /> : <Copy size={compact ? 11 : 15} />}
      {!compact && <span>{copied ? 'Copied' : 'Copy address'}</span>}
    </button>
  )
}

function DetailRow({ label, value, accent = false }) {
  return (
    <div className="maker-inspector__row">
      <dt>{label}</dt>
      <dd className={accent ? 'maker-inspector__value--accent' : ''}>{value}</dd>
    </div>
  )
}

function MakerInspector({ maker, index, onClose }) {
  if (!maker) {
    return (
      <aside className="maker-inspector maker-inspector--empty" aria-live="polite">
        <div className="maker-inspector__empty-icon"><Radio size={24} /></div>
        <p className="section-label">// node inspector</p>
        <h3>Select a maker</h3>
        <p>Click any orbiting node to expand its live offer, fees, liquidity, and fidelity bond.</p>
      </aside>
    )
  }

  const bond = maker.fidelity_bond || {}
  const txid = bond.outpoint?.txid || ''

  return (
    <aside className="maker-inspector" aria-live="polite">
      <div className="maker-inspector__head">
        <div>
          <p className="section-label">// selected node</p>
          <h3>Maker {String(index + 1).padStart(2, '0')}</h3>
        </div>
        <button type="button" onClick={onClose} className="maker-inspector__close" aria-label="Close maker details">
          <X size={17} />
        </button>
      </div>

      <div className="maker-inspector__address">
        <span>{maker.address || 'unknown'}</span>
        <CopyAddressButton address={maker.address} />
      </div>

      <dl className="maker-inspector__grid">
        <DetailRow label="Minimum swap" value={formatSats(maker.min_size)} />
        <DetailRow label="Maximum swap" value={formatSats(maker.max_size)} accent />
        <DetailRow label="Base fee" value={formatSats(maker.base_fee)} />
        <DetailRow label="Amount rate" value={`${formatPct(maker.amount_relative_fee_pct, 3)}%`} />
        <DetailRow label="Time rate" value={`${formatPct(maker.time_relative_fee_pct, 4)}%`} />
        <DetailRow label="Bond amount" value={formatSats(bond.amount)} accent />
        <DetailRow label="Bond locktime" value={`${Number(bond.lock_time || 0).toLocaleString()} blocks`} />
        <DetailRow label="Protocol" value={maker.protocol || 'OpenSwap'} />
      </dl>

      {txid && (
        <a
          href={`${LINKS.market_explorer_tx_base}/${txid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="maker-inspector__bond"
        >
          <ShieldCheck size={16} />
          Inspect fidelity bond
          <ExternalLink size={13} />
        </a>
      )}
    </aside>
  )
}

export default function MakerGraph({ makers, statusLabel, loading }) {
  const [selectedKey, setSelectedKey] = useState('')

  const entries = useMemo(
    () => makers.map((maker, index) => ({ maker, index, key: makerKey(maker, index) })),
    [makers]
  )

  const selectedEntry = entries.find(entry => entry.key === selectedKey) || null

  return (
    <section className="maker-knowledge" aria-label={`${statusLabel} maker knowledge graph`}>
      <div className="maker-knowledge__intro">
        <div>
          <p className="section-label">// live topology</p>
          <h2>Maker Knowledge Graph</h2>
          <p>Each node is a public Tor maker offer. Select a maker to inspect its route economics and bond.</p>
        </div>
        <div className="maker-knowledge__legend" aria-label="Graph legend">
          <span><i className="maker-knowledge__legend-dot" /> {statusLabel}</span>
          <span><i className="maker-knowledge__legend-line" /> Market link</span>
        </div>
      </div>

      <div className="maker-knowledge__layout">
        <div className="maker-graph-wrap">
          <div className="maker-graph" data-empty={entries.length === 0}>
            <div className="maker-graph__grid" aria-hidden="true" />
            <div className="maker-graph__ring maker-graph__ring--one" aria-hidden="true" />
            <div className="maker-graph__ring maker-graph__ring--two" aria-hidden="true" />
            <div className="maker-graph__ring maker-graph__ring--three" aria-hidden="true" />

            <div className="maker-graph__hub" aria-label="OpenSwap market hub">
              <span className="maker-graph__hub-pulse" />
              <OpenSwapLogo className="maker-graph__hub-logo" />
              <strong>OpenSwap</strong>
              <small>
                {loading
                  ? 'syncing'
                  : `${entries.length} ${entries.length === 1 ? 'maker' : 'makers'}`}
              </small>
            </div>

            {entries.map(({ maker, index, key }) => {
              const angle = (360 / Math.max(entries.length, 1)) * index - 90
              const ring = index % 3
              const radius = ring === 0 ? 'min(20vw, 13.25rem)' : ring === 1 ? 'min(25vw, 16.25rem)' : 'min(29vw, 18.6rem)'
              const duration = 44 + ring * 13 + (index % 4) * 4
              const active = selectedKey === key

              return (
                <div
                  key={key}
                  className="maker-orbiter"
                  style={{
                    '--maker-angle': `${angle}deg`,
                    '--maker-radius': radius,
                    '--maker-duration': `${duration}s`,
                    '--maker-delay': `${index * -3.1}s`,
                  }}
                >
                  <div className="maker-orbiter__counter">
                    <div className={`maker-node ${active ? 'maker-node--active' : ''}`}>
                      <button
                        type="button"
                        className="maker-node__select"
                        onClick={() => setSelectedKey(active ? '' : key)}
                        aria-expanded={active}
                        title={maker.address || `Maker ${index + 1}`}
                      >
                        <span className="maker-node__status" />
                        <span className="maker-node__id">M{String(index + 1).padStart(2, '0')}</span>
                        <span className="maker-node__address">{shortenAddress(maker.address)}</span>
                      </button>
                      <CopyAddressButton address={maker.address} compact />
                    </div>
                  </div>
                </div>
              )
            })}

            {!loading && entries.length === 0 && (
              <p className="maker-graph__empty">No nodes in this market snapshot</p>
            )}
          </div>
          <p className="maker-graph__hint">Drag-free orbital view · hover to pause · click a node to expand</p>
        </div>

        <MakerInspector
          maker={selectedEntry?.maker}
          index={selectedEntry?.index ?? 0}
          onClose={() => setSelectedKey('')}
        />
      </div>
    </section>
  )
}
