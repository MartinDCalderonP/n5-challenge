import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartProvider from './context/CartProvider.tsx'
import Home from './pages/Home/index.tsx'
import Buy from './pages/Buy/index.tsx'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buy' element={<Buy />} />

          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
