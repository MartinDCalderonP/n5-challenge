import { useState } from 'react'
import styles from './App.module.scss'
import CartButton from './components/CartButton'
import ProductsList from './components/ProductsList'
import Overlay from './components/Overlay'
import Sidebar from './components/Sidebar'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <main className={styles.mainContainer}>
      <CartButton toggleSidebar={toggleSidebar} />
      <ProductsList />
      <Overlay isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </main>
  )
}

export default App
