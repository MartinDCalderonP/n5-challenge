import styles from './App.module.scss'
import ProductsList from './components/ProductsList'

const App = () => {
  return (
    <main className={styles.container}>
      <ProductsList />
    </main>
  )
}

export default App
