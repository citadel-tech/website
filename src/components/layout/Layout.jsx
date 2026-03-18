import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MotionBackground from './MotionBackground'

export default function Layout() {
  return (
    <div className="min-h-screen bg-navy flex flex-col relative isolate">
      <MotionBackground />
      <Header />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
