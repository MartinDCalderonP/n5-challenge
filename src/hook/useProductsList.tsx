import { useContext } from 'react'
import {
  ProductsListContext,
  ProductListContextValue
} from '../context/ProductsListProvider'

const useProductsList = (): ProductListContextValue => {
  const context = useContext(ProductsListContext)

  if (!context) throw new Error('useCart must be used within a CartProvider')

  return context
}

export default useProductsList
