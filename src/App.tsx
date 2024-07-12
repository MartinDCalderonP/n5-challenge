import { useState } from 'react'
import styles from './App.module.scss'
import CartButton from './components/CartButton'
import ProductsList from './components/ProductsList'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <main className={styles.mainContainer}>
      <CartButton toggleSidebar={toggleSidebar} />
      <ProductsList />
    </main>
  )
}

export default App
