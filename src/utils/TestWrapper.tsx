import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from '../context/CartProvider'

interface TestWrapperProps {
  children: ReactNode
}

const TestWrapper = ({ children }: TestWrapperProps) => {
  return (
    <CartProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </CartProvider>
  )
}

export default TestWrapper
