import React from 'react'
import { CirclePackingLayout } from '../components/VoiceViz/CirclePackingLayout'
import styles from './VoiceViz.module.css'
import { useData } from '../components/Shared/useData'
import { FullScreenMessage } from '../components/Shared/FullScreenMessage'
import { getGridInfo } from '../components/Shared/useGrid'

export const VoiceViz = () => {
  const { data, loadState } = useData({
    groupby: 'word_freq',
    threshold: getGridInfo().nCells,
  })

  const circleData = Object.entries(data)
    .map(([value, answers]) => ({
      value,
      answers,
      items: answers.length,
    }))
    .sort((a, b) => b.items - a.items)

  const states = {
    loading: <FullScreenMessage message="Loading..." />,
    rest: <CirclePackingLayout data={circleData} />,
    error: <FullScreenMessage message="An error occurred! Please, reload the page..." />,
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.packsWrapper}>{states[loadState]}</div>
    </div>
  )
}
