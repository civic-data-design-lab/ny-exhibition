import React from 'react'
import { useRecoilState } from 'recoil'
import { showLabelsState } from '../../state'
import styles from './LabelsToggle.module.css'

export function LabelsToggle() {
  const [showLabels, setShowLabels] = useRecoilState(showLabelsState)

  return (
    <div
      className={`${styles.wrapper} ${showLabels ? styles.wrapperIsActive : ''}`}
      onClick={() => setShowLabels((v) => !v)}
    >
      <span>Labels</span>
      <div className={styles.prettyCheckbox} />
    </div>
  )
}
