import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { NewProduct } from '../../common/interfaces'
import { useNavigate } from 'react-router-dom'
import useProductsList from '../../hook/useProductsList'
import { debounce } from 'lodash'

const AddProduct = () => {
  const [requiredFields, setRequiredFields] = useState<string[]>([])

  const requiredFieldsMessage = `${requiredFields
    .map((field) => (field === 'name' ? 'Nombre' : 'Precio'))
    .join(' y ')} ${
    requiredFields.length > 1
      ? 'son campos requeridos'
      : 'es un campo requerido.'
  }`

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

  const avoidAddingProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      const requiredFields = Object.entries(newProduct)
        .filter(([, value]) => !value)
        .map(([key]) => key)

      setRequiredFields(requiredFields)
      return true
    }

    return false
  }

  const handleAddProduct = debounce(() => {
    if (avoidAddingProduct()) return

    addProduct(newProduct)

    setNewProduct({
      name: '',
      price: 0
    })
  }, 300)

  const navigate = useNavigate()

  return (
    <div className={styles.addProductContainer}>
      <h1>Añadir Producto</h1>
      <form className={styles.addProductForm}>
        {Object.entries(newProduct).map(([key, value]) => (
          <div className={styles.inputWrapper} key={key}>
            <label htmlFor={`product${key}`}>
              {key === 'name' ? 'Nombre' : 'Precio'}
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

        {requiredFields.length > 0 && (
          <p className={styles.requiredFieldsMessage}>
            {requiredFieldsMessage}
          </p>
        )}

        <button type='button' onClick={handleAddProduct}>
          Añadir Producto
        </button>

        <button type='button' onClick={() => navigate('/')}>
          Volver
        </button>
      </form>
    </div>
  )
}

export default AddProduct
