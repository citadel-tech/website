/**
 * Badge
 * variant: 'orange' | 'amber' | 'blue'
 */
export default function Badge({ children, variant = 'orange' }) {
  const styles = {
    orange: 'bg-orange/15 text-orange border-orange/30',
    amber:  'bg-amber/15 text-amber border-amber/30',
    blue:   'bg-blue/20 text-blue-l border-blue/30',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-medium border ${styles[variant]}`}>
      {children}
    </span>
  )
}
