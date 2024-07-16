import ProductsList from '../../components/ProductsList'
import renderWithProviders from '../../utils/renderWithProviders'
import { describe, expect, test } from 'vitest'
import data from '../../assets/productsList.json'
import { currencyFormatter } from '../../utils'

describe('ProductsList', () => {
  test('renders a list of products', () => {
    const { getAllByText, getByText } = renderWithProviders(<ProductsList />)

    const productsListTitle = getByText('Lista de Productos', {
      selector: 'h2'
    })

    expect(productsListTitle).toBeInTheDocument()

    for (const product of data.products) {
      const productNameText = new RegExp(product.name, 'i')
      const productPriceText = currencyFormatter
        .format(product.price)
        .replace(/\$/g, '')
        .replace(/\s/g, '')

      const productName = getByText(productNameText)
      const productPrice = getAllByText(new RegExp(productPriceText, 'i'))

      expect(productName).toBeInTheDocument()
      expect(productPrice.length).toBeGreaterThan(0)
    }
  })
})
