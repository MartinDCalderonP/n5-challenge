import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index.tsx'
import CartProvider from './context/CartProvider.tsx'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
