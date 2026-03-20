/**
 * Badge
 * variant: 'orange' | 'amber' | 'blue' | 'green'
 */
export default function Badge({ children, variant = 'orange' }) {
  const styles = {
    orange: 'border-black/20 bg-transparent text-black',
    amber: 'border-black/20 bg-transparent text-black',
    blue: 'border-black/20 bg-transparent text-black',
    green: 'border-black/20 bg-transparent text-black',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-mono font-medium uppercase tracking-[0.18em] ${styles[variant] ?? styles.orange}`}>
      [{children}]
    </span>
  )
}
