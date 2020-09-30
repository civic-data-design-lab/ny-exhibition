import React from 'react'
import styles from './FullScreenMessage.module.css'

export const FullScreenMessage = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.centered}>{message}</div>
    </div>
  )
}
