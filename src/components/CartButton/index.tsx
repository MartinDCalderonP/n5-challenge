import styles from './styles.module.scss'
import { FaShoppingCart } from 'react-icons/fa'
import useCart from '../../hook/useCart'

const CartButton = () => {
  const productsCount = useCart().cartItems.length

  return (
    <button className={styles.cartButton}>
      <FaShoppingCart />

      {productsCount > 0 && (
        <p className={styles.productsCount}>{productsCount}</p>
      )}
    </button>
  )
}

export default CartButton
