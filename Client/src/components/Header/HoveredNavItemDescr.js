import React from 'react'
import styles from './HoveredNavItemDescr.module.css'

export const HoveredNavItemDescr = ({ navItems, hoveredItem }) => {
  return (
    <div
      className={`${styles.hoveredNavItemDescr} ${
        hoveredItem !== null ? styles.hoveredNavItemDescrIsVisible : ''
      }`}
    >
      {hoveredItem !== null && navItems.find(({ route }) => route === hoveredItem).descr}
    </div>
  )
}
