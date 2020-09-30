import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { questionHistoryState } from '../../state'
import styles from './MobileNotice.module.css'
import stylesUtils from '../../styles/utils.module.css'

export const MobileNotice = () => {
  const [isVisible, setIsVisible] = useState(false)
  const questionHistory = useRecoilValue(questionHistoryState)

  const close = (e) => {
    e.preventDefault()
    setIsVisible(false)
  }

  const showPopup = () => {
    if (questionHistory.length) {
      setIsVisible(true)
    }
  }

  useEffect(showPopup, [questionHistory])

  return (
    isVisible && (
      <div className={styles.wrapper}>
        <div className={styles.closeBtnWrapper}>
          <button className={styles.closeBtn} onClick={close} aria-label="Close mobile notice">
            <span className={stylesUtils.screenreaderOnly}>Close mobile notice</span>
          </button>
        </div>
        <span className={styles.text}>
          Visit visualizenyc.net on your desktop to see all the answers visualized.
        </span>
        <div className={styles.handleWrapper}>
          <div className={styles.handle} />
        </div>
      </div>
    )
  )
}
