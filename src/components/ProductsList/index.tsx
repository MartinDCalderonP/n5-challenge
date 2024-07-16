import ProductListItem from './ProductListItem'
import styles from './styles.module.scss'
import useProductsList from '../../hook/useProductsList'
import { useNavigate } from 'react-router-dom'

const ProductsList = () => {
  const { productsList } = useProductsList()

  const navigate = useNavigate()

  return (
    <article>
      <h2>Products List</h2>
      <ul className={styles.productsList}>
        {productsList.map((product) => (
          <ProductListItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </ul>
      <div className={styles.addProductButtonWrapper}>
        <button
          className={styles.addProductButton}
          onClick={() => navigate('/add-product')}
        >
          Add Product
        </button>
      </div>
    </article>
  )
}

export default ProductsList
