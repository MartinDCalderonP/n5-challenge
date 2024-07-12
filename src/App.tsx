import styles from './App.module.scss'
import CartButton from './components/CartButton'
import ProductsList from './components/ProductsList'

const App = () => {
  return (
    <main className={styles.mainContainer}>
      <CartButton />
      <ProductsList />
    </main>
  )
}

export default App
