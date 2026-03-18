/**
 * Button
 * variant: 'primary' | 'outline' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 * as: element override ('a', 'button') — defaults to 'button'
 * All other props forwarded.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60'

  const variants = {
    primary: 'bg-orange text-navy hover:bg-orange/90 active:bg-orange/80',
    outline: 'border border-blue-l text-blue-l hover:bg-blue-l/10 active:bg-blue-l/20',
    ghost:   'text-cream/70 hover:text-cream hover:bg-white/5 active:bg-white/10',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  }

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
