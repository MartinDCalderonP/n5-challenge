import { createContext, ReactNode, useState, useEffect } from 'react'
import { NewProduct, Product } from '../common/interfaces'
import baseProductsList from '../assets/productsList.json'

export interface ProductListContextValue {
  addProduct: (newProduct: NewProduct) => void
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
    localStorage.setItem('products', JSON.stringify(productsList))
  }, [productsList])

  const addProduct = (newProduct: NewProduct) => {
    setProductsList((prevProducts) => {
      const product: Product = {
        ...newProduct,
        id: prevProducts.length + 1,
        amount: 0
      }

      return [...prevProducts, product]
    })
  }

  return (
    <ProductsListContext.Provider value={{ productsList, addProduct }}>
      {children}
    </ProductsListContext.Provider>
  )
}

export default ProductsListProvider
