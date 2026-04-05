export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  ...props
}) {
  /* !text-* / visited: — global `a { color: inherit }` otherwise steals color on <Link>, yielding dark-on-dark in light mode */
  const base =
    'coinswap-btn inline-flex items-center justify-center gap-2 border font-mono font-medium uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--navy))] rounded-lg'

  const variants = {
    primary:
      'border-cream bg-cream !text-navy visited:!text-navy hover:bg-transparent hover:!text-cream hover:border-cream/50',
    outline:
      'border-cream/30 bg-cream/[0.06] !text-cream visited:!text-cream hover:border-green hover:!text-green hover:bg-green/[0.08] hover:shadow-[0_0_20px_rgba(0,255,157,0.12)]',
    ghost:
      'border-transparent bg-transparent !text-cream/80 visited:!text-cream/80 hover:!text-cream hover:bg-cream/5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-sm',
  }

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
