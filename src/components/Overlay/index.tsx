import styles from './styles.module.scss'

interface OverlayProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Overlay = ({ isSidebarOpen, toggleSidebar }: OverlayProps) => {
  const overlayStyles = `${styles.overlay} ${isSidebarOpen ? styles.open : ''}`

  return <button className={overlayStyles} onClick={toggleSidebar} />
}

export default Overlay
