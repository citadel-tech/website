import { useEffect, useState } from 'react'

const SVG_W = 860
const SVG_H = 470
const SVG_DISPLAY_W = SVG_W + 128
const CENTER_X = 430
const CENTER_Y = 232
const TRIANGLE_R = 178
const ROUTE_RING_R = 58
const NODE_W = 118
const NODE_H = 68
const FUNDING_TXIDS = [
  '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
  '9f3c7ab412e8d50f6a9c33d1be74a8f021cde56b97aa4efc8d102bb7ce51af44',
  'c8a14d7ef903bb62a51f0ce9847bd123fe66a9bc307d4e12f85ac7b19de43f90',
]

function polarToPoint(cx, cy, r, angleDeg) {
  const angle = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

function cornerPoint(from, to, width, height) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const halfW = width / 2
  const halfH = height / 2

  return {
    x: from.x + (dx >= 0 ? halfW : -halfW),
    y: from.y + (dy >= 0 ? halfH : -halfH),
  }
}

function edgePoint(from, to, width, height) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const scale = 1 / Math.max(Math.abs(dx) / (width / 2), Math.abs(dy) / (height / 2))

  return {
    x: from.x + dx * scale,
    y: from.y + dy * scale,
  }
}

const NODES = [
  { id: 'taker', label: 'Taker', sublabel: 'Initiate Swap', angle: 270, type: 'taker' },
  { id: 'maker1', label: 'Maker 1', sublabel: 'Earn Fees', angle: 30, type: 'maker' },
  { id: 'maker2', label: 'Maker 2', sublabel: 'Earn Fees', angle: 150, type: 'maker' },
].map(node => ({
  ...node,
  ...polarToPoint(CENTER_X, CENTER_Y, TRIANGLE_R, node.angle),
}))

const SEGMENTS = NODES.map((node, index) => {
  const next = NODES[(index + 1) % NODES.length]
  const useVerticalMakerLink = node.id === 'maker1' && next.id === 'maker2'
  const hopIndex = index + 1
  return {
    id: `${node.id}-to-${next.id}`,
    hopIndex,
    txid: FUNDING_TXIDS[index],
    from: useVerticalMakerLink
      ? { x: node.x, y: node.y + NODE_H / 2 }
      : cornerPoint(node, next, NODE_W, NODE_H),
    to: useVerticalMakerLink
      ? { x: next.x, y: next.y - NODE_H / 2 }
      : cornerPoint(next, node, NODE_W, NODE_H),
  }
})
const SEGMENT_PATHS = SEGMENTS.map(segment => ({
  ...segment,
  path: `M ${segment.from.x} ${segment.from.y} L ${segment.to.x} ${segment.to.y}`,
}))
const FLOW_DOT_STEP_DURATION = 1.6
const FLOW_DOT_CYCLE_DURATION = FLOW_DOT_STEP_DURATION * SEGMENT_PATHS.length

const GUIDE_POINTS = NODES.map(node => `${node.x},${node.y}`).join(' ')
const ROUTE_ARROW_START = polarToPoint(CENTER_X, CENTER_Y, ROUTE_RING_R, 274)
const ROUTE_ARROW_END = polarToPoint(CENTER_X, CENTER_Y, ROUTE_RING_R, 86)
const ROUTE_ARROW_PATH = [
  `M ${ROUTE_ARROW_START.x} ${ROUTE_ARROW_START.y}`,
  `A ${ROUTE_RING_R} ${ROUTE_RING_R} 0 0 1 ${ROUTE_ARROW_END.x} ${ROUTE_ARROW_END.y}`,
].join(' ')

const HOP_CALLOUT_SIZE = { width: 182, height: 72 }
const HOP2_CALLOUT_OFFSET = 22
const HOP2_CONNECTOR_GAP = 12

function trimMiddle(value, head = 12) {
  if (value.length <= head + 3) {
    return value
  }

  return `${value.slice(0, head)}...`
}

function buildHopCallout(segment) {
  const midX = (segment.from.x + segment.to.x) / 2
  const midY = (segment.from.y + segment.to.y) / 2
  const { width, height } = HOP_CALLOUT_SIZE

  if (segment.id === 'taker-to-maker1') {
    return {
      id: segment.id,
      x: midX - width,
      y: midY - height,
      anchorX: midX,
      anchorY: midY,
      leaderX: midX,
      leaderY: midY,
      width,
      height,
      titleX: 12,
      bodyX: 12,
      align: 'start',
    }
  }

  if (segment.id === 'maker1-to-maker2') {
    const x = midX + HOP2_CALLOUT_OFFSET
    return {
      id: segment.id,
      x,
      y: midY - height / 2,
      anchorX: midX,
      anchorY: midY,
      leaderX: x - HOP2_CONNECTOR_GAP,
      leaderY: midY,
      width,
      height,
      titleX: 12,
      bodyX: 12,
      align: 'start',
    }
  }

  return {
    id: segment.id,
    x: midX - width,
    y: midY,
    anchorX: midX,
    anchorY: midY,
    leaderX: midX - width,
    leaderY: midY,
    width,
    height,
    titleX: 12,
    bodyX: 12,
    align: 'start',
  }
}

function interpolatePoint(from, to, progress) {
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
  }
}

export default function SwapFlowDiagram() {
  const [flowDotPoint, setFlowDotPoint] = useState(() => SEGMENT_PATHS[0].from)

  useEffect(() => {
    let frameId = 0
    let startTime = null

    const animate = timestamp => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsedSeconds = ((timestamp - startTime) / 1000) % FLOW_DOT_CYCLE_DURATION
      const segmentIndex = Math.min(
        Math.floor(elapsedSeconds / FLOW_DOT_STEP_DURATION),
        SEGMENT_PATHS.length - 1
      )
      const segmentProgress = (elapsedSeconds % FLOW_DOT_STEP_DURATION) / FLOW_DOT_STEP_DURATION
      const segment = SEGMENT_PATHS[segmentIndex]

      setFlowDotPoint(interpolatePoint(segment.from, segment.to, segmentProgress))
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  return (
    <section className="section-rule px-0 py-0">
      <p className="mb-3 text-left text-sm font-mono uppercase tracking-[0.24em] text-cream/50">
        Swap Flow
      </p>

      <div className="overflow-x-auto px-0 py-1">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ maxWidth: SVG_DISPLAY_W, display: 'block', margin: '0 auto' }}
          aria-label="CoinSwap triangle flow: taker routes funds through two makers and returns with unrelated coins"
          role="img"
        >
          <defs>
            <linearGradient id="taker-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#101c38" />
              <stop offset="100%" stopColor="#050914" />
            </linearGradient>
            <linearGradient id="maker-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>
            <linearGradient id="taker-accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8fb6ff" />
            </linearGradient>
            <linearGradient id="maker-accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d48d08" />
            </linearGradient>
            <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
            </filter>
            <marker id="pentagon-arrowhead" markerWidth="18" markerHeight="14" refX="15" refY="7" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0 0 L 18 7 L 0 14 z" fill="#111111" />
            </marker>
            <marker id="route-arrowhead" markerWidth="13" markerHeight="13" refX="10" refY="6.5" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0 0 L 13 6.5 L 0 13 z" fill="#fbbf24" />
            </marker>
            <filter id="flow-dot-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feDropShadow dx="0" dy="0" stdDeviation="5.5" floodColor="#fbbf24" floodOpacity="0.95" />
              <feDropShadow dx="0" dy="0" stdDeviation="11" floodColor="#fbbf24" floodOpacity="0.55" />
            </filter>
          </defs>

          <polygon
            points={GUIDE_POINTS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />

          {SEGMENTS.map(segment => {
            const { id, hopIndex, txid, from, to } = segment
            const callout = buildHopCallout(segment)
            const displayTxid = trimMiddle(txid)

            return (
              <g key={id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#111111"
                  strokeOpacity="0.88"
                  strokeWidth="4"
                  strokeLinecap="round"
                  markerEnd="url(#pentagon-arrowhead)"
                />
                {callout && (
                  <g>
                    <path
                      d={
                        callout.id === 'maker1-to-maker2'
                          ? `M ${callout.anchorX} ${callout.anchorY} L ${callout.leaderX} ${callout.leaderY}`
                          : callout.id === 'taker-to-maker1'
                            ? `M ${callout.anchorX} ${callout.anchorY} L ${callout.x + callout.width} ${callout.y + callout.height}`
                            : `M ${callout.anchorX} ${callout.anchorY} L ${callout.x + callout.width} ${callout.y}`
                      }
                      fill="none"
                      stroke="rgba(17,17,17,0.72)"
                      strokeWidth="1.2"
                      strokeDasharray={callout.id === 'maker1-to-maker2' ? undefined : '4 4'}
                    />
                    <g transform={`translate(${callout.x}, ${callout.y})`}>
                      <rect
                        x="0"
                        y="0"
                        width={callout.width}
                        height={callout.height}
                        rx="10"
                        fill="rgba(248, 243, 233, 0.98)"
                        stroke="rgba(17,17,17,0.18)"
                        strokeWidth="1.2"
                      />
                      <rect
                        x="1"
                        y="1"
                        width={callout.width - 2}
                        height={8}
                        rx="9"
                        fill="url(#maker-accent)"
                        opacity="0.9"
                      />
                      <text
                        x={callout.titleX}
                        y="22"
                        textAnchor={callout.align}
                        fill="#111111"
                        fontSize="11.5"
                        fontFamily="'Chakra Petch', sans-serif"
                        fontWeight="700"
                        letterSpacing="0.06em"
                      >
                        Hop {hopIndex}
                      </text>
                      <line
                        x1="12"
                        y1="28"
                        x2={callout.width - 12}
                        y2="28"
                        stroke="rgba(17,17,17,0.12)"
                        strokeWidth="1"
                      />
                      <text
                        x={callout.bodyX}
                        y="45"
                        fill="#111111"
                        fontSize="8.9"
                        fontFamily="'JetBrains Mono', monospace"
                        fontWeight="700"
                        letterSpacing="0.06em"
                        textAnchor="start"
                      >
                        <tspan fill="rgba(17,17,17,0.6)">Funding Tx:</tspan>
                        <tspan dx="6" fill="#111111">{displayTxid}</tspan>
                      </text>
                      <text
                        x={callout.bodyX}
                        y="61"
                        fill="#111111"
                        fontSize="8.9"
                        fontFamily="'JetBrains Mono', monospace"
                        fontWeight="700"
                        letterSpacing="0.06em"
                        textAnchor="start"
                      >
                        <tspan fill="rgba(17,17,17,0.6)">Tx Fees:</tspan>
                        <tspan dx="6" fill="#111111">2 sats/vB</tspan>
                      </text>
                    </g>
                  </g>
                )}
              </g>
            )
          })}

          <g aria-hidden="true" pointerEvents="none">
            <circle
              cx={flowDotPoint.x}
              cy={flowDotPoint.y}
              r="8.5"
              fill="#ffd84d"
              stroke="#fff2a8"
              strokeWidth="2"
              filter="url(#flow-dot-glow)"
            />
          </g>

          <g aria-hidden="true">
            <path
              d={ROUTE_ARROW_PATH}
              fill="none"
              stroke="url(#maker-accent)"
              strokeWidth="2.6"
              strokeLinecap="round"
              markerEnd="url(#route-arrowhead)"
            />
          </g>

          {NODES.map(({ id, label, sublabel, x, y, type }) => {
            const isTaker = type === 'taker'
            const rectFill = isTaker ? 'url(#taker-fill)' : 'url(#maker-fill)'
            const borderColor = isTaker ? '#6ea0ff' : 'rgba(255,255,255,0.34)'
            const accentFill = isTaker ? 'url(#taker-accent)' : 'url(#maker-accent)'
            const shadowOpacity = isTaker ? '0.3' : '0.2'

            return (
              <g key={id} transform={`translate(${x - NODE_W / 2}, ${y - NODE_H / 2})`} filter="url(#node-shadow)">
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="14"
                  ry="14"
                  fill={rectFill}
                  stroke={borderColor}
                  strokeOpacity={isTaker ? '0.95' : '0.8'}
                  strokeWidth="1.6"
                />
                <rect
                  x="1.5"
                  y="1.5"
                  width={NODE_W - 3}
                  height={NODE_H - 3}
                  rx="12"
                  ry="12"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                <rect
                  x="8"
                  y="8"
                  width={NODE_W - 16}
                  height="5"
                  rx="2.5"
                  fill={accentFill}
                  opacity={isTaker ? '0.95' : '0.9'}
                />
                <rect
                  x="8"
                  y={NODE_H - 12}
                  width={NODE_W - 16}
                  height="1"
                  rx="0.5"
                  fill="rgba(255,255,255,0.1)"
                  opacity={shadowOpacity}
                />
                <circle
                  cx={NODE_W - 16}
                  cy="18"
                  r="2.5"
                  fill={accentFill}
                  opacity={isTaker ? '0.9' : '0.75'}
                />
                <text
                  x={NODE_W / 2}
                  y={NODE_H / 2 - 4}
                  textAnchor="middle"
                  fill="#f7f7f7"
                  fontSize="14.2"
                  fontFamily="'Chakra Petch', sans-serif"
                  fontWeight="600"
                  letterSpacing="0.03em"
                >
                  {label}
                </text>
                <text
                  x={NODE_W / 2}
                  y={NODE_H / 2 + 15}
                  textAnchor="middle"
                  fill={isTaker ? '#8fb6ff' : '#f3cc67'}
                  fontSize="9.2"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                  letterSpacing="0.08em"
                >
                  {sublabel}
                </text>
              </g>
            )
          })}

          <text
            x={CENTER_X}
            y={CENTER_Y + 4}
            textAnchor="middle"
            fill="#010101"
            stroke="rgba(237,243,255,0.82)"
            strokeWidth="1.4"
            paintOrder="stroke"
            fontSize="14.2"
            fontFamily="'Chakra Petch', sans-serif"
            fontWeight="600"
            letterSpacing="0.03em"
          >
            Swap Route
          </text>

          <text
            x={SVG_W / 2}
            y={SVG_H - 6}
            textAnchor="middle"
            fill="#EDF3FF"
            fillOpacity="0.35"
            fontSize="10"
            fontFamily="'Inter', sans-serif"
          >
            DIFFERENT COINS IN != DIFFERENT COINS OUT · NO SHARED ON-CHAIN ANCESTOR
          </text>
        </svg>
      </div>
      <p
        className="-mt-1 text-center text-[19.2px] font-bold leading-none tracking-[0.03em] text-[#000000]"
        style={{
          fontFamily: "'Chakra Petch', sans-serif",
          WebkitTextStroke: '0.8px rgba(237,243,255,0.9)',
        }}
      >
        Standrad Multi-hop Swap
      </p>
    </section>
  )
}
