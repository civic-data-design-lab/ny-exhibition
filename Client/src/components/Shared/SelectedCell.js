import React from 'react'
import { useRecoilValue } from 'recoil'
import { THEME_MAP } from '../../lib/constants'
import { clickedCellState, questionsState } from '../../state'
import { SocialShare } from './SocialShare'
import styles from './SelectedCell.module.css'
import { getBorough } from '../../lib/zip-utils'

export function SelectedCell({ svgWidth, svgHeight }) {
  const cell = useRecoilValue(clickedCellState)
  const questions = useRecoilValue(questionsState)

  if (!cell) return null

  const padding = 3
  const panelWidth = 240
  const panelHeight = 240

  const xAlign =
    cell.x < svgWidth - panelWidth - (cell.width + padding)
      ? { left: cell.x + cell.width + padding }
      : { right: svgWidth - cell.x + padding }

  const yAlign =
    cell.y <= svgHeight / 2
      ? { top: cell.y }
      : {
          bottom: svgHeight - cell.y - cell.height,
        }

  // ugly fix, data from api should have questionId, not question
  const { questionThemeId, response, questionId, question: questionPrompt, zip_code } = cell.answer
  const prompt = questionPrompt ?? questions.find(({ id }) => id === questionId)?.prompt
  const backgroundColor = THEME_MAP[questionThemeId].color.fullTint

  return (
    <>
      <div
        className={styles.cellBorder}
        style={{
          top: cell.y,
          left: cell.x,
          width: cell.width,
          height: cell.height,
        }}
      />
      <div
        className={styles.flippablePanel}
        style={{
          ...xAlign,
          ...yAlign,
          width: panelWidth,
          height: panelHeight,
        }}
      >
        <div className={styles.inner}>
          <div className={`${styles.side} ${styles.front}`} style={{ backgroundColor }}>
            <div>
              <span className={styles.answer}>{response}</span>
              <span className={styles.borough}>{getBorough(zip_code)}</span>
            </div>
          </div>
          <div className={`${styles.side} ${styles.back}`} style={{ backgroundColor }}>
            <div>
              <span>{prompt}</span>
            </div>
            <SocialShare />
          </div>
        </div>
      </div>
    </>
  )
}
