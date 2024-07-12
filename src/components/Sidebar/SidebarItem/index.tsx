import styles from './styles.module.scss'
import { currencyFormatter } from '../../../utils'

interface SidebarItemProps {
  amount: number
  name: string
  price: number
}

const SidebarItem = ({ amount, name, price }: SidebarItemProps) => {
  const total = amount * price

  return (
    <li className={styles.sidebarItem}>
      <p>{name}</p>
      <p>
        {price} * {amount} = {currencyFormatter.format(total)}
      </p>
    </li>
  )
}

export default SidebarItem
