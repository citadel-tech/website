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
  const base = 'ui-button inline-flex items-center justify-center gap-2 border font-mono font-medium uppercase tracking-[0.14em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

  const variants = {
    primary: 'ui-button--primary border-orange bg-orange !text-[#07090d]',
    outline: 'ui-button--outline border-black/25 bg-transparent !text-cream',
    ghost:   'ui-button--ghost border-transparent bg-transparent !text-black/70',
  }

  const sizes = {
    sm: 'type-caption px-3 py-1.5',
    md: 'type-ui px-4 py-2.5',
    lg: 'type-small px-6 py-3.5',
  }

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
