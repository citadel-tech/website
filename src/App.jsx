import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Takers from './pages/Takers'
import Makers from './pages/Makers'
import AppsTools from './pages/AppsTools'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="takers" element={<Takers />} />
          <Route path="makers" element={<Makers />} />
          <Route path="apps" element={<AppsTools />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
