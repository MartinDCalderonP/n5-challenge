import styles from './App.module.scss'
import ProductsList from './components/ProductsList'

const App = () => {
  return (
    <main className={styles.mainContainer}>
      <ProductsList />
    </main>
  )
}

export default App
