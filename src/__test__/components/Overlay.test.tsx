import Overlay from '../../components/Overlay'
import renderWithProviders from '../../utils/renderWithProviders'
import { fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

describe('Overlay', () => {
  const mockToggleSidebar = vi.fn()

  test('must render the overlay', () => {
    const { getByRole } = renderWithProviders(
      <Overlay isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const overlay = getByRole('button')

    expect(overlay).toBeInTheDocument()
  })

  test('must call toggleSidebar when clicked and close the sidebar & overlay', () => {
    const { getByRole } = renderWithProviders(
      <Overlay isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const overlay = getByRole('button')

    fireEvent.click(overlay)

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1)

    waitFor(() => {
      expect(overlay).not.toBeInTheDocument()
    })
  })
})
