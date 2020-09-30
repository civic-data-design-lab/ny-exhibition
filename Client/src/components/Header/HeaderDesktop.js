import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'
import styles from './HeaderDesktop.module.css'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { HoveredNavItemDescr } from './HoveredNavItemDescr'
import { AboutPanel } from './AboutPanel'

const { THOUGHTS_VIZ, FUTURE_VIZ, VOICE_VIZ, NYC_MAP_VIZ, QUESTIONS } = ROUTES
const navItems = [
  {
    route: THOUGHTS_VIZ,
    label: 'Thoughts',
    descr: 'This collection of cards shows all responses on an unorganized board.',
  },
  {
    route: FUTURE_VIZ,
    label: 'Future',
    descr:
      'Explore responses organized by the main themes of the Visualize NYC 2021 project: Evolving Public Realm, Climate Change and Resiliency, Right to Housing, and Public Health.',
  },
  {
    route: VOICE_VIZ,
    label: 'Voice',
    descr:
      'Analyzed together, question responses generate a collective voice. See that collective voice grouped by the most common words used to describe concerns, opinions, and dreams.',
  },
  {
    route: NYC_MAP_VIZ,
    label: 'NYC Map',
    descr: 'Explores New Yorkers’ thoughts organized by the neighborhood in which they reside.',
  },
  { route: QUESTIONS, label: 'Prompts', descr: 'View all prompts' },
]

export const HeaderDesktop = () => {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isAboutPanelVisible, setAboutPanel] = useState(false)

  const buildSetHoveredItem = (route) => (e) => {
    setHoveredItem(route)
  }

  const resetHoveredItem = () => {
    setHoveredItem(null)
  }

  const toggleAboutPanel = (e) => {
    e.preventDefault()
    setAboutPanel((isVisible) => !isVisible)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <button
          className={`${styles.logo} ${isAboutPanelVisible ? styles.panelIsVisible : ''}`}
          aria-label="Read the about"
          onClick={toggleAboutPanel}
        >
          <Logo />
          <span className={styles.arrow} aria-hidden="true" />
        </button>
        {<AboutPanel isVisible={isAboutPanelVisible} setIsVisible={setAboutPanel} />}
      </div>

      <div className={styles.navWrapper}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {navItems.map(({ route, label }, i) => (
              <li
                className={`${styles.listItem} ${
                  location.pathname === route ? styles.listItemIsActive : ''
                }`}
                key={i}
              >
                <Link
                  className={styles.link}
                  to={route}
                  onMouseEnter={buildSetHoveredItem(route)}
                  onMouseLeave={resetHoveredItem}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <HoveredNavItemDescr navItems={navItems} hoveredItem={hoveredItem} />
      </div>
    </header>
  )
}
