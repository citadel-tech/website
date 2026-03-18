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
  const base = 'inline-flex items-center justify-center gap-2 border font-mono font-bold uppercase tracking-[0.18em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-l/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black'

  const variants = {
    primary: 'border-green bg-green text-black shadow-[0_0_28px_rgba(0,255,102,0.16)] hover:-translate-y-0.5 hover:bg-[#35ff84] hover:shadow-[0_0_40px_rgba(0,255,102,0.2)] active:translate-y-0',
    outline: 'border-orange/60 bg-orange/6 text-orange hover:-translate-y-0.5 hover:border-orange hover:bg-orange/12 hover:shadow-[0_0_30px_rgba(247,147,26,0.14)] active:translate-y-0',
    ghost:   'border-blue-l/20 bg-blue-l/6 text-blue-l hover:border-blue-l/40 hover:bg-blue-l/12 hover:text-cream active:bg-blue-l/18',
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
