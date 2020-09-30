import React from 'react'
import styles from './Hamburger.module.css'

export const Hamburger = ({ setOpen, isOpen }) => {
  const toggleMenu = (e) => {
    e.preventDefault()
    setOpen((isOpen) => !isOpen)
  }

  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.hamburgerIsOpen : ''}`}
      aria-label="Toggle main menu"
      onClick={toggleMenu}
    >
      <span className={styles.line} />
    </button>
  )
}
