import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="font-display text-7xl font-bold text-cream mb-4">404</p>
      <h1 className="font-display text-2xl font-semibold text-cream mb-6">Page not found</h1>
      <Link
        to="/"
        className="inline-block border border-black/20 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-black/4"
      >
        Back to Home
      </Link>
    </div>
  )
}
