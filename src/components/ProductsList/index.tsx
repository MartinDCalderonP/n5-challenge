import ProductListItem from './ProductListItem'
import styles from './styles.module.scss'
import useProductsList from '../../hook/useProductsList'

const ProductsList = () => {
  const { productsList } = useProductsList()

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
    </article>
  )
}

export default ProductsList
