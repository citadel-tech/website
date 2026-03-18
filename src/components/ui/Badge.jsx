/**
 * Badge
 * variant: 'orange' | 'amber' | 'blue' | 'green'
 */
export default function Badge({ children, variant = 'orange' }) {
  const styles = {
    orange: 'border-orange/50 bg-orange/8 text-orange shadow-[0_0_16px_rgba(247,147,26,0.08)]',
    amber:  'border-amber/50 bg-amber/8 text-amber',
    blue:   'border-blue-l/50 bg-blue-l/10 text-blue-l shadow-[0_0_16px_rgba(59,130,246,0.08)]',
    green:  'border-green/50 bg-green/8 text-green shadow-[0_0_16px_rgba(0,255,102,0.08)]',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium uppercase tracking-[0.18em] border ${styles[variant]}`}>
      [{children}]
    </span>
  )
}
