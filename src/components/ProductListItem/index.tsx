interface ProductListItem {
  id: number
  name: string
  price: number
}

const ProductListItem = ({ id, name, price }: ProductListItem) => {
  return (
    <li key={id}>
      {name} - ${price}
      <input type='number' defaultValue={1} min={1} />
      <button>Add to Cart</button>
    </li>
  )
}

export default ProductListItem
