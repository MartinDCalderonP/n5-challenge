import Home from '../../pages/Home'
import renderWithProviders from '../../utils/renderWithProviders'
import { describe, expect, test } from 'vitest'

describe('Home', () => {
  test('should render the component', () => {
    const { getByText } = renderWithProviders(<Home />)

    const title = getByText(/Products List/i, { selector: 'h2' })

    expect(title).toBeInTheDocument()
  })
})
