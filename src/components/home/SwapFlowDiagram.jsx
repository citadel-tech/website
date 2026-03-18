import './SwapFlowDiagram.css'

const NODES = [
  { id: 'taker-in',  label: 'Taker',    sub: '500,000 sat',  x: 60,   type: 'taker' },
  { id: 'maker1',    label: 'Maker 1',  sub: 'hop 1',         x: 260,  type: 'maker' },
  { id: 'maker2',    label: 'Maker 2',  sub: 'hop 2',         x: 460,  type: 'maker' },
  { id: 'taker-out', label: 'Taker',    sub: '438,642 sat',  x: 660,  type: 'taker' },
]

// Arrow segments: [fromX, toX, y, delay]
const ARROWS = [
  { fromX: 130, toX: 230, delay: '0s' },
  { fromX: 330, toX: 430, delay: '0.6s' },
  { fromX: 530, toX: 630, delay: '1.2s' },
]

const NODE_W = 100
const NODE_H = 64
const SVG_W  = 760
const SVG_H  = 140
const CY     = 52

export default function SwapFlowDiagram() {
  return (
    <section>
      <p className="text-cream/30 text-xs font-body uppercase tracking-widest mb-5 text-center">
        Swap flow
      </p>

      {/* SVG diagram */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ maxWidth: SVG_W, display: 'block', margin: '0 auto' }}
          aria-label="Coinswap flow: Taker sends coins through two makers and receives clean coins"
          role="img"
        >
          {/* Defs */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#3B82F6" opacity="0.6" />
            </marker>

            {/* Animated dot gradient */}
            <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F7931A" />
              <stop offset="100%" stopColor="#F7931A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Arrow lines */}
          {ARROWS.map(({ fromX, toX, delay }, i) => (
            <g key={i}>
              <line
                x1={fromX} y1={CY} x2={toX} y2={CY}
                stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.35"
                markerEnd="url(#arrowhead)"
              />
              {/* Animated travelling dot */}
              <circle r="4" fill="#F7931A" className="swap-dot" style={{ '--delay': delay }}>
                <animateMotion
                  dur="1.8s"
                  repeatCount="indefinite"
                  begin={delay}
                  path={`M${fromX},${CY} L${toX - 10},${CY}`}
                />
              </circle>
            </g>
          ))}

          {/* Nodes */}
          {NODES.map(({ id, label, sub, x, type }) => {
            const isTaker = type === 'taker'
            const rectFill    = isTaker ? '#1E3A8A' : 'rgba(247,147,26,0.08)'
            const borderColor = isTaker ? '#3B82F6'  : '#F7931A'
            const labelColor  = '#F5F0EB'
            const subColor    = isTaker ? '#93c5fd'  : '#F7931A'

            return (
              <g key={id} transform={`translate(${x}, ${CY - NODE_H / 2})`}>
                <rect
                  width={NODE_W} height={NODE_H}
                  rx="10" ry="10"
                  fill={rectFill}
                  stroke={borderColor} strokeOpacity="0.5" strokeWidth="1.5"
                />
                <text
                  x={NODE_W / 2} y={NODE_H / 2 - 6}
                  textAnchor="middle"
                  fill={labelColor}
                  fontSize="13" fontFamily="'Space Grotesk', sans-serif" fontWeight="600"
                >
                  {label}
                </text>
                <text
                  x={NODE_W / 2} y={NODE_H / 2 + 12}
                  textAnchor="middle"
                  fill={subColor}
                  fontSize="10.5" fontFamily="'Inter', sans-serif"
                >
                  {sub}
                </text>
              </g>
            )
          })}

          {/* Bottom label */}
          <text
            x={SVG_W / 2} y={SVG_H - 8}
            textAnchor="middle"
            fill="#F5F0EB" fillOpacity="0.25"
            fontSize="10" fontFamily="'Inter', sans-serif"
          >
            Different coins in ≠ different coins out · no shared on-chain ancestor
          </text>
        </svg>
      </div>
    </section>
  )
}
