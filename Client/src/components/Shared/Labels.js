import React from 'react'
import { useRecoilValue } from 'recoil'
import { showLabelsState } from '../../state'
import styles from './Labels.module.css'

export function Labels({ labels }) {
  const showLabels = useRecoilValue(showLabelsState)
  return labels.map((l, i) => (
    <div
      key={i}
      className={`${styles.wrapper} ${showLabels ? styles.wrapperIsVisible : ''}`}
      style={{
        top: l.y - 1,
        left: l.x - 1,
        width: l.width + 2,
        height: l.height + 2,
        color: l.color,
      }}
    >
      <div>{l.label}</div>
    </div>
  ))
}
