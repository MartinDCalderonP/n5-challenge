import SidebarItem from '../../components/Sidebar/SidebarItem'
import renderWithProviders from '../../utils/renderWithProviders'
import { describe, expect, test } from 'vitest'

describe('SidebarItem', () => {
  const testProduct = {
    amount: 2,
    name: 'Test Product',
    price: 100
  }

  test('should render the component', () => {
    const { getByText } = renderWithProviders(<SidebarItem {...testProduct} />)

    const productName = getByText(/Test Product/i)
    const productPrice = getByText(/100,00/i)
    const productAmount = getByText(/2/i)
    const productTotal = getByText(/200,00/i)

    expect(productName).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
    expect(productAmount).toBeInTheDocument()
    expect(productTotal).toBeInTheDocument()
  })
})
