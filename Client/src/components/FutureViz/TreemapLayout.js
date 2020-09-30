import React, { useRef } from 'react'
import * as d3 from 'd3-hierarchy'
import { sumBy, inRange, sum } from 'lodash'
import {
  EMPTY_CELL_BORDER_COLOR,
  LABELS_FONT,
  LABELS_MIN_PADDING,
  THEME_MAP,
} from '../../lib/constants'
import styles from '../../components/Shared/Layout.module.css'
import { getTextWidth } from '../../lib/getTextWidth'
import { Labels } from '../Shared/Labels'
// import { LabelsToggle } from '../Shared/LabelsToggle'
import { useGrid } from '../Shared/useGrid'
import { useMinimapUpdate } from '../Shared/useMinimapUpdate'
import { SelectedCell } from '../Shared/SelectedCell'
import { usePromptRandomQuestion, useUpdateClickedCell } from '../../state'
// import { Minimap } from '../Shared/Minimap'

const sortFn = (a, b) => b.answers?.length - a.answers?.length

export function TreemapLayout({ data }) {
  const ref = useRef()
  const { grid, width, height, cellPadding, cellWidth, cellSide } = useGrid()
  useMinimapUpdate(ref, width, height)

  const setClicked = useUpdateClickedCell()
  const promptRandomQuestion = usePromptRandomQuestion()

  const totalAnswers = sumBy(data, 'answers.length')
  const minFreePerc = 0.2
  const freeCells = Math.max(grid.length * minFreePerc, grid.length - totalAnswers)

  const fillersWeights = [10, 1000, 100]
  const filler = fillersWeights.map((w) => ({
    id: 'filler',
    answers: { length: (freeCells * w) / sum(fillersWeights) },
  }))
  const values = {
    children: [...data.sort(sortFn), ...filler],
  }

  const h = d3.hierarchy(values).sum((theme) => theme.answers?.length)

  const tree =
    d3
      .treemap()
      .padding(0)
      .tile(d3.treemapBinary)

      .size([width, height])(h).children ?? []

  const rects = tree
    .filter((rect) => rect.data.id !== 'filler')
    // round values
    .map((rect) => ({
      ...rect,
      x0: Math.round(rect.x0 / cellWidth) * cellWidth + cellPadding,
      x1: Math.round(rect.x1 / cellWidth) * cellWidth + cellPadding,
      y0: Math.round(rect.y0 / cellWidth) * cellWidth + cellPadding,
      y1: Math.round(rect.y1 / cellWidth) * cellWidth + cellPadding,
    }))
    .map((rect) => ({
      ...rect,
      x: rect.x0,
      y: rect.y0,
      width: rect.x1 - rect.x0,
      height: rect.y1 - rect.y0,
    }))
    .map((rect) => {
      const cells = grid
        .filter((cell) => {
          const xInside = inRange(cell.x + cell.width / 2, rect.x0, rect.x1)
          const yInside = inRange(cell.y + cell.height / 2, rect.y0, rect.y1)
          return xInside && yInside
        })
        .map((cell, i) => ({ ...cell, answer: rect.data.answers[i % rect.data.answers.length] }))

      return { ...rect, cells }
    })

  const labels = rects.map((r) => {
    const label = THEME_MAP[r.data.questionThemeId].label
    const textWidth = getTextWidth(label, LABELS_FONT) + LABELS_MIN_PADDING * 2
    const width = Math.ceil((textWidth - cellSide) / cellWidth) * cellWidth + cellSide

    return {
      label,
      x: r.x,
      y: r.y,
      height: cellWidth + cellSide,
      width,
      color: THEME_MAP[r.data.questionThemeId].color.fullTint,
    }
  })

  return (
    <div className={styles.wrapper} ref={ref}>
      <div style={{ width, height, position: 'relative' }}>
        <svg
          width={`${width}`}
          height={`${height}`}
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

          {rects
            .flatMap((rect) => rect.cells)
            .map((cell, i) => (
              <rect
                key={i}
                x={cell.x}
                y={cell.y}
                width={cell.width}
                height={cell.height}
                fill={
                  cell.answer
                    ? THEME_MAP[cell.answer.questionThemeId].color.fullTint
                    : EMPTY_CELL_BORDER_COLOR
                }
                onClick={() => setClicked(cell)}
              />
            ))}
          {/* DEBUG */}
          {/* {rects.map((rect, i) => (
          <rect
          key={i}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill={THEME_MAP[rect.data.questionThemeId]?.color.fullTint ?? 'none'}
          stroke="black"
          opacity="0.5"
          />
        ))} */}
        </svg>

        <Labels labels={labels} />
        <SelectedCell svgHeight={height} svgWidth={width} />
      </div>

      {/* <LabelsToggle /> */}
      {/* <Minimap /> */}
    </div>
  )
}
