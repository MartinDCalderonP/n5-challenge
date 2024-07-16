import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductsListProvider from './context/ProductsListProvider.tsx'
import CartProvider from './context/CartProvider.tsx'
import Home from './pages/Home/index.tsx'
import Buy from './pages/Buy/index.tsx'
import AddProduct from './pages/AddProduct/index.tsx'

const App = () => {
  return (
    <ProductsListProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/buy' element={<Buy />} />
            <Route path='/add-product' element={<AddProduct />} />

            <Route path='*' element={<Home />} />
          </Routes>
        </Router>
      </CartProvider>
    </ProductsListProvider>
  )
}

export default App
