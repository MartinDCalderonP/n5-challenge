import CartProvider, {
  CartContext,
  CartContextValue
} from '../../context/CartProvider'
import { useContext } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { describe, expect, test } from 'vitest'

describe('CartProvider', () => {
  const TestComponent = () => {
    const cartContext = useContext(CartContext) as CartContextValue

    return (
      <>
        <div data-testid='total'>{cartContext.getTotal()}</div>
        <button
          data-testid='add-button'
          onClick={() =>
            cartContext.addToCart({
              id: 1,
              name: 'Product 1',
              price: 10,
              amount: 1
            })
          }
        >
          Add to Cart
        </button>
        <button
          data-testid='remove-button'
          onClick={() => cartContext.removeFromCart(1)}
        >
          Remove from Cart
        </button>
        <button data-testid='clear-button' onClick={cartContext.clearCart}>
          Clear Cart
        </button>
      </>
    )
  }

  test('should render the total correctly', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    const totalElement = screen.getByTestId('total')
    expect(totalElement.textContent).toBe('0')
  })

  test('should add item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    const addButton = screen.getByTestId('add-button')
    fireEvent.click(addButton)

    const totalElement = screen.getByTestId('total')
    expect(totalElement.textContent).toBe('10')

    fireEvent.click(addButton)

    expect(totalElement.textContent).toBe('20')
  })

  test('should remove item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    const removeButton = screen.getByTestId('remove-button')
    fireEvent.click(removeButton)

    const totalElement = screen.getByTestId('total')
    expect(totalElement.textContent).toBe('0')
  })

  test('should clear the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    const addButton = screen.getByTestId('add-button')
    fireEvent.click(addButton)

    const clearButton = screen.getByTestId('clear-button')
    fireEvent.click(clearButton)

    const totalElement = screen.getByTestId('total')
    expect(totalElement.textContent).toBe('0')
  })
})
