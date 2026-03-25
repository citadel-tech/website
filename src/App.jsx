import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Takers from './pages/Takers'
import Makers from './pages/Makers'
import Docs from './pages/Docs'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="takers" element={<Takers />} />
          <Route path="makers" element={<Makers />} />
          <Route path="docs" element={<Docs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
