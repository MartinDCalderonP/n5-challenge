import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import useCart from '../../hook/useCart'
import { currencyFormatter } from '../../utils'
import DarkModeButton from '../../components/DarkModeButton'

const Buy = () => {
  const { getTotal } = useCart()

  const totalPrice = currencyFormatter.format(getTotal())

  return (
    <main className={styles.buyContainer}>
      <DarkModeButton />
      <h1> El precio final de su compra es de: {totalPrice}</h1>
      <Link to='/'>¿Desea agregar algún otro producto?</Link>
    </main>
  )
}

export default Buy
