import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { usePickRandomQuestion, useShowCurrentQuestion } from '../state'
import { Hamburger } from '../components/Header/Hamburger'
import { AboutContents } from '../components/Header/AboutContents'
import { Tabs } from '../components/Header/Tabs'
import { QuestionModal } from '../components/Shared/QuestionModal'
import { ReactComponent as Logo } from '../assets/logo.svg'
import styles from './Mobile.module.css'

export const Mobile = () => {
  const location = useLocation()
  const [isHamburgerOpen, setHamburgerOpen] = useState(null)
  const [activeTab, setActiveTab] = useState(null)
  const pickRandomQuestion = usePickRandomQuestion()
  const showCurrentQuestion = useShowCurrentQuestion()

  const updateActiveTab = (tab) => {
    setHamburgerOpen(false)
    setActiveTab(tab)
  }

  const reset = (e) => {
    e.preventDefault()
    updateActiveTab(null)
  }

  const pickRandomQuestionOnHomepage = () => {
    if (!activeTab) {
      pickRandomQuestion()
    }
  }

  useEffect(pickRandomQuestionOnHomepage, [activeTab])
  useEffect(showCurrentQuestion, [location])

  return (
    <>
      <header className={`${styles.header} ${isHamburgerOpen ? styles.headerIsExpanded : ''}`}>
        <button className={styles.logoWrapper} onClick={reset} aria-label="Shoot me a prompt">
          <Logo />
        </button>
        <Hamburger setOpen={setHamburgerOpen} isOpen={isHamburgerOpen} />
      </header>

      <div className={`${styles.tabsPanel} ${isHamburgerOpen ? styles.tabsPanelIsVisible : ''}`}>
        <Tabs activeTab={activeTab} setActiveTab={updateActiveTab} />
      </div>

      <main className={styles.main}>
        {activeTab ? (
          <div className={styles.contentsWrapper}>
            <div className={styles.contents}>{AboutContents[activeTab.toLowerCase()]}</div>
          </div>
        ) : (
          <QuestionModal />
        )}
      </main>
    </>
  )
}
