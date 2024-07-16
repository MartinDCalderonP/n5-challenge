import styles from './styles.module.scss'
import { FaTimes, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import useCart from '../../hook/useCart'
import SidebarItem from './SidebarItem'
import { currencyFormatter } from '../../utils'

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const sidebarStyles = `${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`

  const { cartItems, clearCart, getTotal } = useCart()

  const totalPrice = getTotal()

  const navigate = useNavigate()

  return (
    <div className={sidebarStyles}>
      <button
        className={styles.closeButton}
        data-testid='close-button'
        onClick={toggleSidebar}
      >
        <FaTimes />
      </button>

      {cartItems.length === 0 && (
        <div className={styles.emptyCart}>
          No tienes ningún producto en el carrito de compras.
        </div>
      )}

      {cartItems.length > 0 && (
        <nav>
          <ul className={styles.sidebarList}>
            {cartItems.map((cartItem) => (
              <SidebarItem
                key={cartItem.id}
                amount={cartItem.amount}
                name={cartItem.name}
                price={cartItem.price}
              />
            ))}
          </ul>
          <div className={styles.totalPrice}>
            Precio Total: {currencyFormatter.format(totalPrice)}
          </div>
          <div className={styles.cartButtons}>
            <button
              className={styles.clearButton}
              data-testid='clear-button'
              onClick={() => clearCart()}
            >
              <FaTrash />
            </button>
            <button
              className={styles.buyButton}
              data-testid='buy-button'
              onClick={() => navigate('/buy')}
            >
              Comprar
            </button>
          </div>
        </nav>
      )}
    </div>
  )
}

export default Sidebar
