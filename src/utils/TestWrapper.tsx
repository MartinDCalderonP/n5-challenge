import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from '../context/CartProvider'
import ProductsListProvider from '../context/ProductsListProvider'

interface TestWrapperProps {
  children: ReactNode
}

const TestWrapper = ({ children }: TestWrapperProps) => {
  return (
    <ProductsListProvider>
      <CartProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </CartProvider>
    </ProductsListProvider>
  )
}

export default TestWrapper
