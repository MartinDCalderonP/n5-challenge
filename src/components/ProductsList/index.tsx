import ProductListItem from '../ProductListItem'
import data from './products.json'
import styles from './styles.module.scss'

const ProductsList = () => {
  return (
    <article>
      <h2>Products List</h2>
      <ul className={styles.productsList}>
        {data.products.map((product) => (
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
