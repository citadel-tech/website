import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MotionBackground from './MotionBackground'

export default function Layout() {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-navy text-black">
      <MotionBackground />
      <Header />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
