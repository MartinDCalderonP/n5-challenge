import { useState } from 'react'
import styles from './styles.module.scss'
import DarkModeButton from '../../components/DarkModeButton'
import CartButton from '../../components/CartButton'
import ProductsList from '../../components/ProductsList'
import Overlay from '../../components/Overlay'
import Sidebar from '../../components/Sidebar'

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <main className={styles.homeContainer}>
      <DarkModeButton />
      <CartButton toggleSidebar={toggleSidebar} />
      <ProductsList />
      <Overlay isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </main>
  )
}

export default Home
