import styles from './styles.module.scss'
import { FaShoppingCart } from 'react-icons/fa'
import useCart from '../../hook/useCart'

interface CartButtonProps {
  toggleSidebar: () => void
}

const CartButton = ({ toggleSidebar }: CartButtonProps) => {
  const { cartItems } = useCart()

  return (
    <button className={styles.cartButton} onClick={toggleSidebar}>
      <FaShoppingCart />

      {cartItems.length > 0 && (
        <p className={styles.productsCount}>{cartItems.length}</p>
      )}
    </button>
  )
}

export default CartButton
