import React, { useState } from 'react'
import utilsStyles from '../../styles/utils.module.css'
import styles from './AboutPanel.module.css'
import { AboutContents } from './AboutContents'
import { Tabs } from './Tabs'

export const AboutPanel = ({ isVisible, setIsVisible }) => {
  const [activeTab, setActiveTab] = useState('About')

  const close = (e) => {
    e.preventDefault()
    setIsVisible(false)
  }

  return (
    <div className={`${styles.panelWrapper} ${isVisible ? styles.panelIsVisible : ''}`}>
      <button className={styles.close} onClick={close} aria-label="Close the about panel">
        <span className={utilsStyles.screenreaderOnly}>Close the about panel</span>
      </button>
      <div className={styles.panel}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={styles.contentsWrapper}>
          <div className={styles.contents}>{AboutContents[activeTab.toLowerCase()]}</div>
        </div>
      </div>
    </div>
  )
}
