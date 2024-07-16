import { fireEvent } from '@testing-library/react'
import Sidebar from '../../components/Sidebar'
import renderWithProviders from '../../utils/renderWithProviders'
import { describe, expect, test, vi } from 'vitest'

describe('Sidebar', () => {
  const mockToggleSidebar = vi.fn()

  const cartItems = [
    {
      id: 1,
      amount: 2,
      name: 'Test Product',
      price: 100
    }
  ]

  test('should render the component with an empty cart message', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <Sidebar isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const closeButton = getByTestId('close-button')
    const emptyCartMessage = getByText(
      /No tienes ningún producto en el carrito de compras/i
    )

    expect(closeButton).toBeInTheDocument()
    expect(emptyCartMessage).toBeInTheDocument()
  })

  test('should render the component with a list of products', async () => {
    const mockUseCart = await import('../../hooks/useCart')

    vi.spyOn(mockUseCart, 'default').mockReturnValue({
      addToCart: vi.fn(),
      cartItems: cartItems,
      clearCart: vi.fn(),
      getTotal: vi.fn(),
      removeFromCart: vi.fn()
    })

    const { getByTestId, getByText } = renderWithProviders(
      <Sidebar isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const closeButton = getByTestId('close-button')
    const productName = getByText(/Test Product/i)
    const productPrice = getByText(/100,00/i)
    const productAmount = getByText(/2/i)
    const productTotal = getByText(/200,00/i)
    const totalPrice = getByText(/Precio Total/i)

    expect(closeButton).toBeInTheDocument()
    expect(productName).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
    expect(productAmount).toBeInTheDocument()
    expect(productTotal).toBeInTheDocument()
    expect(totalPrice).toBeInTheDocument()
  })

  test('should call the toggleSidebar function when the close button is clicked', () => {
    const { getByTestId } = renderWithProviders(
      <Sidebar isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const closeButton = getByTestId('close-button')

    fireEvent.click(closeButton)

    expect(mockToggleSidebar).toHaveBeenCalled()
  })

  test('should call the clearCart function when the clear button is clicked', async () => {
    const mockUseCart = await import('../../hooks/useCart')

    vi.spyOn(mockUseCart, 'default').mockReturnValue({
      addToCart: vi.fn(),
      cartItems: cartItems,
      clearCart: vi.fn(),
      getTotal: vi.fn(),
      removeFromCart: vi.fn()
    })

    const { getByTestId } = renderWithProviders(
      <Sidebar isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const clearButton = getByTestId('clear-button')

    fireEvent.click(clearButton)

    expect(mockUseCart.default().clearCart).toHaveBeenCalled()
  })

  test('should navigate to the buy page when the buy button is clicked', async () => {
    const { getByTestId } = renderWithProviders(
      <Sidebar isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const buyButton = getByTestId('buy-button')

    fireEvent.click(buyButton)

    const location = window.location.pathname

    expect(location).toBe('/buy')
  })
})
