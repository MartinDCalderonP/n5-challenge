import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Product } from '../common/interfaces'

export interface CartContextValue {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
)

interface CartProvider {
  children: ReactNode
}

const CartProvider = ({ children }: CartProvider) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems')

    if (savedCartItems) setCartItems(JSON.parse(savedCartItems))
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback(
    (product: Product) => {
      setCartItems((prevItems) => {
        const existingCartItem = prevItems.find(
          (item) => item.id === product.id
        )

        if (existingCartItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, amount: item.amount + product.amount }
              : item
          )
        } else {
          return [...prevItems, product]
        }
      })
    },
    [setCartItems]
  )

  const removeFromCart = useCallback(
    (productId: number) => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      )
    },
    [setCartItems]
  )

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [setCartItems])

  const getTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    )
  }, [cartItems])

  const value: CartContextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal
    }),
    [cartItems, addToCart, removeFromCart, clearCart, getTotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
