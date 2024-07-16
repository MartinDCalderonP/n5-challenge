import ColorSchemeButton from '../../components/ColorSchemeButton'
import renderWithProviders from '../../utils/renderWithProviders'
import { fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('ColorSchemeButton', () => {
  test('must initially render the moon icon', () => {
    const { getByTestId } = renderWithProviders(<ColorSchemeButton />)

    const moonIcon = getByTestId('moon')

    expect(moonIcon).toBeInTheDocument()
  })

  test('must render the sun icon when clicked', () => {
    const { getByRole, getByTestId } = renderWithProviders(
      <ColorSchemeButton />
    )

    const colorSchemeButton = getByRole('button')

    fireEvent.click(colorSchemeButton)

    waitFor(() => {
      const sunIcon = getByTestId('sun')

      expect(sunIcon).toBeInTheDocument()
    })
  })
})
