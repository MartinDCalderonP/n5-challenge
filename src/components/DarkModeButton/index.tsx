import { useState } from 'react'
import styles from './styles.module.scss'
import { FaMoon, FaSun } from 'react-icons/fa'

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <button className={styles.darkModeButton} onClick={toggleDarkMode}>
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default DarkModeButton
