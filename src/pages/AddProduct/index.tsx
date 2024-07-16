import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { NewProduct } from '../../common/interfaces'
import { useNavigate } from 'react-router-dom'
import useProductsList from '../../hook/useProductsList'
import { capitalizeFirstLetter } from '../../utils'

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    price: 0
  })

  const { addProduct } = useProductsList()

  const handleNewProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setNewProduct({
      ...newProduct,
      [name]: name === 'price' ? parseFloat(value) : value
    })
  }

  const handleAddProduct = () => {
    addProduct(newProduct)

    setNewProduct({
      name: '',
      price: 0
    })
  }

  const navigate = useNavigate()

  return (
    <div className={styles.addProductContainer}>
      <h1>Add Product</h1>
      <form className={styles.addProductForm}>
        {Object.entries(newProduct).map(([key, value]) => (
          <div className={styles.inputWrapper} key={key}>
            <label htmlFor={`product${key}`}>
              {capitalizeFirstLetter(key)}
            </label>
            <input
              type={key === 'price' ? 'number' : 'text'}
              id={`product${key}`}
              value={value}
              onChange={handleNewProductChange}
              name={key}
            />
          </div>
        ))}

        <button type='button' onClick={handleAddProduct}>
          Add Product
        </button>

        <button type='button' onClick={() => navigate('/')}>
          Volver
        </button>
      </form>
    </div>
  )
}

export default AddProduct
