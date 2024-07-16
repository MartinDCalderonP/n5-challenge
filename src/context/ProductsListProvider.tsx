import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect
} from 'react'
import { NewProduct, Product } from '../common/interfaces'
import baseProductsList from '../assets/productsList.json'

export interface ProductListContextValue {
  addProduct: (newProduct: NewProduct) => string
  productsList: Product[]
}

export const ProductsListContext = createContext<
  ProductListContextValue | undefined
>(undefined)

interface ProductsListProviderProps {
  children: ReactNode
}

const ProductsListProvider = ({ children }: ProductsListProviderProps) => {
  const savedProductsList = localStorage.getItem('productsList')

  const [productsList, setProductsList] = useState<Product[]>(
    savedProductsList
      ? JSON.parse(savedProductsList)
      : [...baseProductsList.products]
  )

  useEffect(() => {
    localStorage.setItem('productsList', JSON.stringify(productsList))
  }, [productsList])

  const addProduct = useCallback(
    (newProduct: NewProduct) => {
      const productExists = productsList.find(
        (product) => product.name === newProduct.name
      )

      if (productExists) return 'Product already exists'

      setProductsList((prevProducts) => {
        const product: Product = {
          ...newProduct,
          id: prevProducts.length + 1,
          amount: 0
        }

        return [...prevProducts, product]
      })

      return 'Success'
    },
    [productsList, setProductsList]
  )

  const value: ProductListContextValue = useMemo(
    () => ({
      addProduct,
      productsList
    }),
    [addProduct, productsList]
  )

  return (
    <ProductsListContext.Provider value={value}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductsListProvider
