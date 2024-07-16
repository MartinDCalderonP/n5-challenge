import AddProduct from '../../pages/AddProduct'
import renderWithProviders from '../../utils/renderWithProviders'
import { fireEvent, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('AddProduct', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
  })

  test('should render the component', () => {
    const { getByText } = renderWithProviders(<AddProduct />)

    const title = getByText('Añadir Producto', { selector: 'h1' })
    const nameLabel = getByText(/Nombre:/i)
    const priceLabel = getByText(/Precio:/i)
    const addButton = getByText('Añadir Producto', { selector: 'button' })
    const goBackButton = getByText('Volver', { selector: 'button' })

    expect(title).toBeInTheDocument()
    expect(nameLabel).toBeInTheDocument()
    expect(priceLabel).toBeInTheDocument()
    expect(addButton).toBeInTheDocument()
    expect(goBackButton).toBeInTheDocument()
  })

  test('should go back to the home page', () => {
    const { getByText } = renderWithProviders(<AddProduct />)

    const goBackButton = getByText(/Volver/i)

    fireEvent.click(goBackButton)

    const location = window.location.pathname

    expect(location).toBe('/')
  })

  test('should show an error message if the product name is empty', async () => {
    const { getByLabelText, getByRole, queryByText } = renderWithProviders(
      <AddProduct />
    )

    const nameInput = getByLabelText(/Nombre:/i)
    const priceInput = getByLabelText(/Precio:/i)
    const addButton = getByRole('button', { name: /Añadir Producto/i })

    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.change(priceInput, { target: { value: '100' } })

    fireEvent.click(addButton)

    await waitFor(() => {
      const errorMessage = queryByText('Nombre es un campo requerido.')

      expect(errorMessage).toBeInTheDocument()
    })
  })

  test('should show an error message if the product price is empty', async () => {
    const { getByLabelText, getByRole, queryByText } = renderWithProviders(
      <AddProduct />
    )

    const nameInput = getByLabelText(/Nombre:/i)
    const priceInput = getByLabelText(/Precio:/i)
    const addButton = getByRole('button', { name: /Añadir Producto/i })

    fireEvent.change(nameInput, { target: { value: 'Product 1' } })
    fireEvent.change(priceInput, { target: { value: 0 } })

    fireEvent.click(addButton)

    await waitFor(() => {
      const errorMessage = queryByText('Precio es un campo requerido.')

      expect(errorMessage).toBeInTheDocument()
    })
  })

  test('should show an error message if both fields are empty', async () => {
    const { getByRole, queryByText } = renderWithProviders(<AddProduct />)

    const addButton = getByRole('button', { name: /Añadir Producto/i })

    fireEvent.click(addButton)

    await waitFor(() => {
      const errorMessage = queryByText('Nombre y Precio son campos requeridos.')

      expect(errorMessage).toBeInTheDocument()
    })
  })

  test('should add a product to the list and show a success message', async () => {
    const mockUseProductsList = await import('../../hooks/useProductsList')

    vi.spyOn(mockUseProductsList, 'default').mockReturnValue({
      addProduct: vi.fn().mockReturnValue('Success'),
      productsList: []
    })

    const { getByLabelText, getByRole, queryByText } = renderWithProviders(
      <AddProduct />
    )

    const nameInput = getByLabelText(/Nombre:/i)
    const priceInput = getByLabelText(/Precio:/i)
    const addButton = getByRole('button', { name: /Añadir Producto/i })

    fireEvent.change(nameInput, { target: { value: 'Product 1' } })
    fireEvent.change(priceInput, { target: { value: '100' } })

    fireEvent.click(addButton)

    await waitFor(() => {
      expect(mockUseProductsList.default().addProduct).toHaveBeenCalledWith({
        name: 'Product 1',
        price: 100
      })

      const successMessage = queryByText('Producto añadido')

      expect(successMessage).toBeInTheDocument()
    })
  })

  test('should show an error message if the product already exists', async () => {
    const mockUseProductsList = await import('../../hooks/useProductsList')

    vi.spyOn(mockUseProductsList, 'default').mockReturnValue({
      addProduct: vi.fn().mockReturnValue('Product already exists'),
      productsList: [{ id: 1, name: 'Product 1', price: 100, amount: 0 }]
    })

    const { getByLabelText, getByRole, queryByText } = renderWithProviders(
      <AddProduct />
    )

    const nameInput = getByLabelText(/Nombre:/i)
    const priceInput = getByLabelText(/Precio:/i)
    const addButton = getByRole('button', { name: /Añadir Producto/i })

    fireEvent.change(nameInput, { target: { value: 'Product 1' } })
    fireEvent.change(priceInput, { target: { value: '100' } })

    fireEvent.click(addButton)

    await waitFor(() => {
      expect(mockUseProductsList.default().addProduct).toHaveBeenCalledWith({
        name: 'Product 1',
        price: 100
      })

      const errorMessage = queryByText('Producto ya existe')

      expect(errorMessage).toBeInTheDocument()
    })
  })
})
