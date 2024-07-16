import { useState } from 'react'
import styles from './styles.module.scss'
import { FaMoon, FaSun } from 'react-icons/fa'

type ColorScheme = 'light' | 'dark'

const ColorSchemeButton = () => {
  const currentColorScheme =
    document.documentElement.getAttribute('color-scheme')

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    currentColorScheme as ColorScheme
  )

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light'
    setColorScheme(newColorScheme)
    document.documentElement.setAttribute('color-scheme', newColorScheme)
  }

  return (
    <button className={styles.colorSchemeButton} onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? (
        <FaSun data-testid='sun' />
      ) : (
        <FaMoon data-testid='moon' />
      )}
    </button>
  )
}

export default ColorSchemeButton
