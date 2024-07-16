import { fireEvent } from '@testing-library/react'
import ProductListItem from '../../components/ProductsList/ProductListItem'
import renderWithProviders from '../../utils/renderWithProviders'
import { describe, expect, test, vi } from 'vitest'

describe('ProductListItem', () => {
  const testProduct = {
    id: 1,
    name: 'Test Product',
    price: 100
  }

  test('must render the product name and price', async () => {
    const { getByRole, getByText } = renderWithProviders(
      <ProductListItem {...testProduct} />
    )

    const productName = getByText(/Test Product/i)
    const productPrice = getByText(/100,00/i)
    const input = getByRole('spinbutton')
    const addToCartButton = getByRole('button')

    expect(productName).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
    expect(input).toHaveValue(1)
    expect(addToCartButton).toHaveTextContent('Add to Cart')
  })

  test('must change the product amount', async () => {
    const { getByRole } = renderWithProviders(
      <ProductListItem {...testProduct} />
    )

    const input = getByRole('spinbutton')

    fireEvent.change(input, { target: { value: '2' } })

    expect(input).toHaveValue(2)

    fireEvent.change(input, { target: { value: '1' } })

    expect(input).toHaveValue(1)
  })

  test('must add the product to the cart', async () => {
    const mockUseCart = await import('../../hook/useCart')

    vi.spyOn(mockUseCart, 'default').mockReturnValue({
      addToCart: vi.fn(),
      cartItems: [],
      clearCart: vi.fn(),
      getTotal: vi.fn(),
      removeFromCart: vi.fn()
    })

    const { getByRole } = renderWithProviders(
      <ProductListItem {...testProduct} />
    )

    const addToCartButton = getByRole('button')

    fireEvent.click(addToCartButton)

    expect(mockUseCart.default().addToCart).toHaveBeenCalledWith({
      ...testProduct,
      amount: 1
    })
  })
})
