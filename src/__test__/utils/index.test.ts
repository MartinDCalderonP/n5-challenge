import { capitalizeFirstLetter, currencyFormatter } from '../../utils'
import { describe, expect, test } from 'vitest'

describe('capitalizeFirstLetter', () => {
  test('should capitalize the first letter of a string', () => {
    const string = 'hello world'
    const capitalizedString = capitalizeFirstLetter(string)

    expect(capitalizedString).toBe('Hello world')
  })
})

describe('currencyFormatter', () => {
  test('should be an instance of Intl.NumberFormat', () => {
    expect(currencyFormatter).toBeInstanceOf(Intl.NumberFormat)
  })

  test('should have a style of currency', () => {
    expect(currencyFormatter.resolvedOptions().style).toBe('currency')
  })

  test('should have a currency of ARS', () => {
    expect(currencyFormatter.resolvedOptions().currency).toBe('ARS')
  })
})
