export default function Card({ children, className = '' }) {
  return (
    <div className={`glass-panel p-8 md:p-10 ${className}`}>
      {children}
    </div>
  )
}
