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
  const base = 'inline-flex items-center justify-center gap-2 border font-mono font-medium uppercase tracking-[0.14em] text-white transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f2e8]'

  const variants = {
    primary: 'border-black bg-black !text-white hover:bg-black/85 active:bg-black/90',
    outline: 'border-black bg-black !text-white hover:bg-black/85 active:bg-black/90',
    ghost:   'border-black bg-black !text-white hover:bg-black/85 active:bg-black/90',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-[15px] px-6 py-3.5',
  }

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
