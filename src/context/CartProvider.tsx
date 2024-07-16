import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { NewProduct, Product } from '../common/interfaces'

export interface CartContextValue {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getTotal: () => number
  addProduct: (product: NewProduct) => void
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
)

interface CartProvider {
  children: ReactNode
}

const CartProvider = ({ children }: CartProvider) => {
  const savedCartItems = localStorage.getItem('cartItems')

  const [cartItems, setCartItems] = useState<Product[]>(
    savedCartItems ? JSON.parse(savedCartItems) : []
  )

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

  const addProduct = useCallback(
    (product: NewProduct) => {
      setCartItems((prevItems) => {
        const newProduct = {
          ...product,
          id: Math.floor(Math.random() * 1000),
          amount: 0
        }

        return [...prevItems, newProduct]
      })
    },
    [setCartItems]
  )

  const value: CartContextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      addProduct
    }),
    [cartItems, addToCart, removeFromCart, clearCart, getTotal, addProduct]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
