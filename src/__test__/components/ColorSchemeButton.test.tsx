import { render, fireEvent, waitFor } from '@testing-library/react'
import ColorSchemeButton from '../../components/ColorSchemeButton'
import { describe, expect, test } from 'vitest'

describe('ColorSchemeButton', () => {
  test('must initially render the moon icon', () => {
    const { getByTestId } = render(<ColorSchemeButton />)

    const moonIcon = getByTestId('moon')

    expect(moonIcon).toBeInTheDocument()
  })

  test('must render the sun icon when clicked', () => {
    const { getByRole, getByTestId } = render(<ColorSchemeButton />)

    const colorSchemeButton = getByRole('button')

    fireEvent.click(colorSchemeButton)

    waitFor(() => {
      const sunIcon = getByTestId('sun')

      expect(sunIcon).toBeInTheDocument()
    })
  })
})
