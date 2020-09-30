import React from 'react'
import { useRecoilValue } from 'recoil'
import { minimapInfoState } from '../../state'
import styles from './Minimap.module.css'

export function Minimap() {
  const minimapInfo = useRecoilValue(minimapInfoState)

  const width = 100

  const scale = (x) => (x / minimapInfo.svgWidth) * width
  const height = scale(minimapInfo.svgHeight)

  const left = scale(minimapInfo.x)
  const top = scale(minimapInfo.y)

  const zoomWidth = Math.min(scale(minimapInfo.width), width - left)
  const zoomHeight = Math.min(scale(minimapInfo.height), height - top)

  if (zoomWidth >= width && zoomHeight >= height) return null
  return (
    <div
      className={styles.minimap}
      style={{
        width,
        height,
      }}
    >
      <div className={styles.zoomWrapper}>
        <div
          className={styles.zoom}
          style={{
            left,
            top,
            width: zoomWidth,
            height: zoomHeight,
          }}
        ></div>
      </div>
    </div>
  )
}
