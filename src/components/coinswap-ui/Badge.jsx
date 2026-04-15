export default function Badge({ children, variant = 'orange' }) {
  const styles = {
    orange: 'border-orange/30 text-orange',
    amber: 'border-amber/30 text-amber',
    cream: 'border-cream/20 text-cream/80',
    green: 'border-green/30 text-green',
  }

  return (
    <span className={`type-caption inline-flex items-center gap-1.5 border rounded-md px-3 py-1.5 font-mono font-medium uppercase tracking-[0.18em] backdrop-blur-sm ${styles[variant] ?? styles.orange}`}>
      [{children}]
    </span>
  )
}
