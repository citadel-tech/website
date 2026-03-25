import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="site-shell py-32 text-center">
      <p className="type-hero font-display font-bold text-cream mb-4">404</p>
      <h1 className="type-section-title font-display font-semibold text-cream mb-6">Page not found</h1>
      <Link
        to="/"
        className="type-ui inline-block border border-black/20 px-5 py-2.5 font-semibold text-cream transition-colors hover:bg-black/4"
      >
        Back to Home
      </Link>
    </div>
  )
}
