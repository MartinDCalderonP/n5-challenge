import { useContext } from 'react'
import { CartContext, CartContextValue } from '../context/CartProvider'

const useCart = (): CartContextValue => {
  const context = useContext(CartContext)

  if (!context) throw new Error('useCart must be used within a CartProvider')

  return context
}

export default useCart
