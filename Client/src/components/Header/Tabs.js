import React from 'react'
import styles from './Tabs.module.css'

const tabs = ['About', 'Contributors', 'Sponsors']

export const Tabs = ({ activeTab, setActiveTab }) => {
  const updateActiveTab = (tab) => (e) => {
    e.preventDefault()
    setActiveTab(tab)
  }

  return (
    <ul className={styles.tabs}>
      {tabs.map((tab, i) => {
        return (
          <li key={i} className={`${styles.item} ${activeTab === tab ? styles.itemIsActive : ''}`}>
            <button
              className={styles.btn}
              onClick={updateActiveTab(tab)}
              aria-label={`See ${tab} contents`}
            >
              {tab}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
