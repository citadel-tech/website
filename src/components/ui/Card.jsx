/**
 * Card — terminal-window bordered container.
 * Accepts any className overrides.
 */
export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`panel-grid panel-glow overflow-hidden border border-white/10 bg-[linear-gradient(145deg,rgba(4,8,12,0.94),rgba(8,11,20,0.92))] p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
