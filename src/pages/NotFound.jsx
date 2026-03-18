import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="text-orange font-display font-bold text-7xl mb-4">404</p>
      <h1 className="font-display text-2xl font-semibold text-cream mb-6">Page not found</h1>
      <Link
        to="/"
        className="inline-block px-5 py-2.5 bg-orange text-navy font-semibold rounded-lg hover:bg-orange/90 transition-colors text-sm"
      >
        Back to Home
      </Link>
    </div>
  )
}
