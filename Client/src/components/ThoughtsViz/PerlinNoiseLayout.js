import React, { useMemo, useRef } from 'react'
import { EMPTY_CELL_BORDER_COLOR, THEME_MAP } from '../../lib/constants'
import { noisyGrid } from '../../lib/noisyGrid'
import styles from '../../components/Shared/Layout.module.css'
import { useMinimapUpdate } from '../../components/Shared/useMinimapUpdate'
import { useGrid } from '../Shared/useGrid'
import { usePromptRandomQuestion, useUpdateClickedCell } from '../../state'
import { SelectedCell } from '../Shared/SelectedCell'
// import { Minimap } from '../Shared/Minimap'

export const PerlinNoiseLayout = ({ data }) => {
  const ref = useRef()
  const { grid, width, height, rows, cols, cellPadding, cellSide, cellWidth } = useGrid()
  useMinimapUpdate(ref, width, height)
  const setClicked = useUpdateClickedCell()
  const promptRandomQuestion = usePromptRandomQuestion()

  const answersToDisplay = Math.min(data.length, cols * rows * 0.8)
  const noiseMemo = useMemo(() => noisyGrid(cols, rows, answersToDisplay), [
    cols,
    rows,
    answersToDisplay,
  ])

  const noiseGrid = noiseMemo.map((cell, i) => ({
    x: cell.x * cellWidth + cellPadding,
    y: cell.y * cellWidth + cellPadding,
    width: cellSide,
    height: cellSide,
    answer: data[i],
  }))

  return (
    <div className={styles.wrapper} ref={ref}>
      <div style={{ width, height, position: 'relative' }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className={styles.svg}
        >
          {grid.map((cell, i) => (
            <rect
              key={i}
              {...cell}
              stroke={EMPTY_CELL_BORDER_COLOR}
              fill="transparent"
              strokeWidth="1"
              rx="2"
              onClick={promptRandomQuestion}
            />
          ))}

          {noiseGrid.map((cell, i) => (
            <rect
              key={i}
              {...cell}
              fill={
                cell.answer
                  ? THEME_MAP[cell.answer.questionThemeId].color.fullTint
                  : EMPTY_CELL_BORDER_COLOR
              }
              rx="2"
              onClick={() => setClicked(cell)}
            />
          ))}
        </svg>
        {/* <Minimap /> */}
        <SelectedCell svgHeight={height} svgWidth={width} />
      </div>
    </div>
  )
}
