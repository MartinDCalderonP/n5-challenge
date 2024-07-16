import CartButton from '../../components/CartButton'
import renderWithProviders from '../../utils/renderWithProviders'
import { fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('CartButton', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
  })

  test('renders CartButton and shows the correct cart item count', async () => {
    const mockUseCart = await import('../../hooks/useCart')

    mockUseCart.default = vi.fn().mockReturnValue({
      cartItems: [{ id: 1 }, { id: 2 }]
    })

    const toggleSidebar = vi.fn()

    const { getByRole, getByTestId } = renderWithProviders(
      <CartButton toggleSidebar={toggleSidebar} />
    )

    const cartButton = getByRole('button')
    const productCount = getByTestId('product-count')

    expect(cartButton).toBeInTheDocument()
    expect(productCount).toBeInTheDocument()
  })

  test('calls toggleSidebar when the button is clicked', async () => {
    const mockUseCart = await import('../../hooks/useCart')

    mockUseCart.default = vi.fn().mockReturnValue({
      cartItems: [{ id: 1 }, { id: 2 }]
    })

    const toggleSidebar = vi.fn()

    const { getByRole } = renderWithProviders(
      <CartButton toggleSidebar={toggleSidebar} />
    )

    const cartButton = getByRole('button')

    fireEvent.click(cartButton)

    expect(toggleSidebar).toHaveBeenCalled()
  })

  test('does not show the item count when there are no items in the cart', async () => {
    const mockUseCart = await import('../../hooks/useCart')

    mockUseCart.default = vi.fn().mockReturnValue({
      cartItems: []
    })

    const toggleSidebar = vi.fn()

    const { queryByTestId } = renderWithProviders(
      <CartButton toggleSidebar={toggleSidebar} />
    )

    const productCount = queryByTestId('product-count')

    expect(productCount).not.toBeInTheDocument()
  })
})
