import React, { useRef } from 'react'
import { pack, bounds } from '../../lib/pack'
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

const CIRCLE_CELL_PADDING = 2

const rotate = ({ x, y }, a) => ({
  x: x * Math.cos(a) - y * Math.sin(a),
  y: x * Math.sin(a) + y * Math.cos(a),
})

function packAndScale(circles, width, height) {
  const circlesWithPadding = circles.map((c) => ({ ...c, r: c.r + CIRCLE_CELL_PADDING }))

  const nodes = pack(circlesWithPadding, width, height).map((node) => ({
    ...node,

    // rotate nodes to fix broken packing algorithm
    ...rotate(node, Math.PI / 2),
  }))

  const [x, y, w, h] = bounds(nodes)
  const scaleW = width / w
  const scaleH = height / h
  const scale = Math.min(scaleW, scaleH)

  const scaled = nodes
    // scale to fit
    .map((n) => ({
      ...n,
      x: (n.x - x) * scale,
      y: (n.y - y) * scale,
      r: (n.r - CIRCLE_CELL_PADDING) * scale,
    }))

  // center circles
  const offX = (width - w * scale) / 2
  const offY = (height - h * scale) / 2
  const centered = scaled.map((n) => ({
    ...n,
    x: n.x + offX,
    y: n.y + offY,
  }))

  return centered
}

export const CirclePackingLayout = ({ data }) => {
  const ref = useRef()
  const { grid, width, height, cellPadding, cellSide, cellWidth } = useGrid()
  useMinimapUpdate(ref, width, height)

  const setClicked = useUpdateClickedCell()
  const promptRandomQuestion = usePromptRandomQuestion()

  const nodes = data.map((tag) => ({ r: Math.sqrt(tag.items), tag }))

  const circles = packAndScale(nodes, width, height)
    // translate circles to fit cells
    .map((node) => {
      const xp = Math.floor(node.x / cellWidth)
      const x = cellSide / 2 + xp * cellWidth + cellPadding

      const yp = Math.floor(node.y / cellWidth)
      const y = cellSide / 2 + yp * cellWidth + cellPadding

      return { ...node, x, y }
    })
    // scale radius if too big
    .map((node) => {
      const area = node.r ** 2 * Math.PI
      const cells = area / cellSide ** 2

      const filledRatio = node.tag.answers.length / cells
      const scaler = Math.min(1, filledRatio)

      const r = node.r * Math.sqrt(scaler)
      return { ...node, r }
    })
    // add cells
    .map((circ) => {
      const cells = grid
        .filter((cell) => {
          const cx = cell.x + cell.width / 2
          const cy = cell.y + cell.height / 2

          const d = Math.hypot(cy - circ.y, cx - circ.x)
          const isInside = d <= circ.r
          return isInside
        })
        .map((cell, i) => ({ ...cell, answer: circ.tag.answers[i % circ.tag.answers.length] }))

      return { ...circ, cells }
    })

  const labels = circles.map((c) => {
    const label = c.tag.value
    const textWidth = getTextWidth(label, LABELS_FONT) + LABELS_MIN_PADDING * 2

    const cells = Math.floor((Math.ceil((textWidth - cellSide) / cellWidth) + 1) / 2) * 2 + 1

    const width = cells * cellWidth - cellPadding

    const x = c.x - cellSide / 2 - Math.floor(cells / 2) * cellWidth
    const y = c.y - cellSide / 2 - cellWidth
    return {
      label,
      x,
      y,
      height: cellWidth + cellSide,
      width,
    }
  })

  return (
    <div className={styles.wrapper} ref={ref}>
      <div style={{ width, height, position: 'relative' }}>
        <svg width={`${width}`} height={`${height}`} viewBox={`0 0 ${width} ${height}`}>
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

          <g>
            {circles
              .flatMap((c) => c.cells)
              .map((c, i) => (
                <g key={i}>
                  <rect
                    x={c.x}
                    y={c.y}
                    width={c.width}
                    height={c.height}
                    fill={
                      c.answer
                        ? THEME_MAP[c.answer.questionThemeId].color.fullTint
                        : EMPTY_CELL_BORDER_COLOR
                    }
                    rx="2"
                    onClick={() => setClicked(c)}
                  />
                </g>
              ))}
          </g>

          {/* DEBUG */}
          {/* <g fill="none" stroke="black" strokeWidth="1" pointerEvents="none">
          {circles.map((node, i) => {
            return (
              <g key={i} transform={`translate(${node.x} ${node.y})`}>
              <circle cx={0} cy={0} r={node.r} />
              <line x1={-node.r} x2={node.r} />
              <line y1={-node.r} y2={node.r} />
              </g>
              )
            })}
          </g> */}
        </svg>

        <Labels labels={labels} />
        <SelectedCell svgHeight={height} svgWidth={width} />
      </div>
      {/* <LabelsToggle /> */}
      {/* <Minimap /> */}
    </div>
  )
}
