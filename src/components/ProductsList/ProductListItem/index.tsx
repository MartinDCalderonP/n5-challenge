import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import useCart from '../../../hooks/useCart'
import { currencyFormatter } from '../../../utils'

interface ProductListItemProps {
  id: number
  name: string
  price: number
}

const ProductListItem = ({ id, name, price }: ProductListItemProps) => {
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

  return (
    <li key={id} className={styles.productListItem}>
      {name} - {currencyFormatter.format(price)}
      <input
        type='number'
        value={productAmount}
        onChange={handleProductAmountChange}
      />
      <button type='button' onClick={handleProductAdd}>
        Agregar al Carrito
      </button>
    </li>
  )
}

export default ProductListItem
