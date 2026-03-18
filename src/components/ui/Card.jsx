/**
 * Card — generic bordered container.
 * Accepts any className overrides.
 */
export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-xl border border-blue/30 bg-blue/5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
