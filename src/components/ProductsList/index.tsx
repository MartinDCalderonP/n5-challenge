import data from './products.json'
import styles from './styles.module.scss'

const ProductsList = () => {
  return (
    <article>
      <h2>Products List</h2>
      <ul className={styles.productsList}>
        {data.products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <input type='number' defaultValue={1} min={1} />
            <button>Add to Cart</button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ProductsList
