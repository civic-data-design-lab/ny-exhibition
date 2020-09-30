import React, { useRef } from 'react'
import { cloneDeep, range } from 'lodash'
import { EMPTY_CELL_BORDER_COLOR, THEME_MAP } from '../../lib/constants'
import styles from '../../components/Shared/Layout.module.css'
import { useRecoilValue } from 'recoil'
import { nycMapState, usePromptRandomQuestion, useUpdateClickedCell } from '../../state'
import { useGrid } from '../Shared/useGrid'
import { useMinimapUpdate } from '../Shared/useMinimapUpdate'
import paletteStyles from '../../styles/palette.module.css'
import { SelectedCell } from '../Shared/SelectedCell'
// import { Minimap } from '../Shared/Minimap'

export const CartogramLayout = ({ data: dataByZipCode }) => {
  const ref = useRef()
  const { cellPadding, cellSide, cellWidth, cols: gridCols } = useGrid()
  const nyc = useRecoilValue(nycMapState)
  const setClicked = useUpdateClickedCell()
  const promptRandomQuestion = usePromptRandomQuestion()

  const width = Math.max(gridCols, nyc.cols) * cellWidth
  const height = nyc.rows * cellWidth + cellPadding

  useMinimapUpdate(ref, width, height)

  const cellsClone = cloneDeep(nyc.cells)
  const cellsByZipCode = {}
  for (const cell of cellsClone) {
    // push same cell reference in each zipCode array
    for (const zipCode of cell.zipCodes) {
      if (cellsByZipCode[zipCode]) {
        cellsByZipCode[zipCode].push(cell)
      } else {
        cellsByZipCode[zipCode] = [cell]
      }
    }
  }

  const sortedZipCodes = Object.entries(cellsByZipCode)
    .sort((a, b) => a[1].length - b[1].length)
    .map(([zip]) => zip)

  for (const zipCode of sortedZipCodes) {
    const data = dataByZipCode[zipCode]
    if (!data) continue
    for (const answer of data) {
      const cells = cellsByZipCode[answer.zip_code]
      const freeCell = cells.find((c) => !c.answer)
      if (freeCell) freeCell.answer = answer
    }
  }

  const colsOffset = Math.max(Math.floor((gridCols - nyc.cols) / 2), 0)

  const cells = cellsClone.map((c) => ({
    ...c,
    x: (c.x + colsOffset) * cellWidth + cellPadding,
    y: c.y * cellWidth + cellPadding,
    width: cellSide,
    height: cellSide,
  }))

  return (
    <div className={styles.wrapper} ref={ref}>
      <div style={{ width, height, position: 'relative' }}>
        <svg
          width={`${width}`}
          height={`${height}`}
          viewBox={`0 0 ${width} ${height}`}
          className={styles.svg}
        >
          {range(Math.max(nyc.cols, gridCols)).map((ix) =>
            range(nyc.rows).map((iy) => (
              <rect
                key={`${ix}-${iy}`}
                x={ix * cellWidth + cellPadding}
                y={iy * cellWidth + cellPadding}
                width={cellSide}
                height={cellSide}
                rx="2"
                stroke={EMPTY_CELL_BORDER_COLOR}
                fill="transparent"
                onClick={promptRandomQuestion}
              ></rect>
            ))
          )}
          {cells.map(({ zipCodes, ...cell }, i) => (
            <rect
              key={i}
              {...cell}
              fill={
                cell.answer
                  ? THEME_MAP[cell.answer.questionThemeId].color.fullTint
                  : paletteStyles.midGrey
              }
              strokeWidth="1"
              rx="2"
              onClick={() => (cell.answer ? setClicked(cell) : promptRandomQuestion())}
            />
          ))}
        </svg>
        <SelectedCell svgHeight={height} svgWidth={width} />
      </div>
      {/* <Minimap /> */}
    </div>
  )
}
