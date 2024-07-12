import styles from './styles.module.scss'
import { FaShoppingCart } from 'react-icons/fa'
import useCart from '../../hook/useCart'

  const { cartItems } = useCart()

  return (
    <button className={styles.cartButton}>
      <FaShoppingCart />

      {cartItems.length > 0 && (
        <p className={styles.productsCount}>{cartItems.length}</p>
      )}
    </button>
  )
}

export default CartButton
