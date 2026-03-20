/**
 * Card — terminal-window bordered container.
 * Accepts any className overrides.
 */
export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`border-t border-dotted border-black/15 pt-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
