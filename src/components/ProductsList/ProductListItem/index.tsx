import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import useCart from '../../../hook/useCart'

interface ProductListItem {
  id: number
  name: string
  price: number
}

const ProductListItem = ({ id, name, price }: ProductListItem) => {
  const { addToCart } = useCart()
  const [productAmount, setProductAmount] = useState(1)

  const handleProductAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setProductAmount(value)
  }

  const handleProductAdd = () => {
    const product = { id, name, price, amount: productAmount }
    addToCart(product)
    setProductAmount(1)
  }

  console.log(useCart().cartItems)

  return (
    <li key={id} className={styles.productListItem}>
      {name} - ${price}
      <input
        type='number'
        value={productAmount}
        onChange={handleProductAmountChange}
      />
      <button type='button' onClick={handleProductAdd}>
        Add to Cart
      </button>
    </li>
  )
}

export default ProductListItem
