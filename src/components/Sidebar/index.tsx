import styles from './styles.module.scss'
import { FaTimes } from 'react-icons/fa'
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

  return (
    <div className={sidebarStyles}>
      <button className={styles.closeButton} onClick={toggleSidebar}>
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
          <button className={styles.clearButton} onClick={() => clearCart()}>
            Vaciar
          </button>
        </nav>
      )}
    </div>
  )
}

export default Sidebar
