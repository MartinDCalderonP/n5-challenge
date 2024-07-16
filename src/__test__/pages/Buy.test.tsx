import Buy from '../../pages/Buy'
import renderWithProviders from '../../utils/renderWithProviders'
import { fireEvent } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Buy', () => {
  test('should render the component', () => {
    const { getByText } = renderWithProviders(<Buy />)

    const title = getByText(/El precio final de su compra es de:/i)
    const returnHomeLink = getByText(/¿Desea agregar algún otro producto?/i)

    expect(title).toBeInTheDocument()
    expect(returnHomeLink).toBeInTheDocument()
  })

  test('should navigate to the Home page', async () => {
    const { getByText } = renderWithProviders(<Buy />)

    const returnHomeLink = getByText(/¿Desea agregar algún otro producto?/i)

    fireEvent.click(returnHomeLink)

    const location = window.location.pathname

    expect(location).toBe('/')
  })
})
