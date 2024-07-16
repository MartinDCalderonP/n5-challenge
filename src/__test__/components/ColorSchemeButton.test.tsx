import { render, fireEvent, waitFor } from '@testing-library/react'
import ColorSchemeButton from '../../components/ColorSchemeButton'
import { describe, expect, test } from 'vitest'

describe('ColorSchemeButton', () => {
  test('must initially render the moon icon', () => {
    const { getByTestId } = render(<ColorSchemeButton />)

    expect(getByTestId('moon')).toBeInTheDocument()
  })

  test('must render the sun icon when clicked', () => {
    const { getByRole, getByTestId } = render(<ColorSchemeButton />)

    fireEvent.click(getByRole('button'))

    waitFor(() => expect(getByTestId('sun')).toBeInTheDocument())
  })
})
