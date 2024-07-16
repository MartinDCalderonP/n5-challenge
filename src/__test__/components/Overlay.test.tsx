import { render, fireEvent, waitFor } from '@testing-library/react'
import Overlay from '../../components/Overlay'
import { describe, expect, test, vi } from 'vitest'

describe('Overlay', () => {
  const mockToggleSidebar = vi.fn()

  test('must render the overlay', () => {
    const { getByRole } = render(
      <Overlay isSidebarOpen={true} toggleSidebar={mockToggleSidebar} />
    )

    const overlay = getByRole('button')

    expect(overlay).toBeInTheDocument()
  })

  test('must call toggleSidebar when clicked and close the sidebar & overlay', () => {
    const { getByRole } = render(
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
