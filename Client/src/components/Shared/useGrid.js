import { range } from 'lodash'
import { useState } from 'react'
import { CELL_PADDING, CELL_WIDTH, CELL_SIDE } from '../../lib/constants'

export function getGridInfo() {
  const width = window.innerWidth - 8 // side border of .main
  const height = (window.innerHeight * 87.5) / 100 - 4

  // BUILD GRID
  const rows = Math.floor((height - CELL_PADDING) / CELL_WIDTH)
  const cols = Math.floor((width - CELL_PADDING) / CELL_WIDTH)
  const nCells = rows * cols

  const actualWidth = cols * CELL_WIDTH + CELL_PADDING
  const sparePixels = width - actualWidth

  const cellSide = CELL_SIDE + (sparePixels / actualWidth) * CELL_SIDE
  const cellPadding = CELL_PADDING + (sparePixels / actualWidth) * CELL_PADDING
  const cellWidth = cellSide + cellPadding

  return { width, height, cols, rows, cellSide, cellPadding, cellWidth, nCells }
}

function getGrid() {
  const gridInfo = getGridInfo()
  const grid = range(gridInfo.rows).flatMap((iy) =>
    range(gridInfo.cols).map((ix) => ({
      ix,
      iy,
      x: ix * gridInfo.cellWidth + gridInfo.cellPadding,
      y: iy * gridInfo.cellWidth + gridInfo.cellPadding,
      width: gridInfo.cellSide,
      height: gridInfo.cellSide,
    }))
  )

  return { ...gridInfo, grid }
}

export function useGrid() {
  // eslint-disable-next-line
  const [gridInfo, setGridInfo] = useState(getGrid)

  // uncomment and add dependency to update grid
  // useEffect(() => setGridInfo(getGrid())),[])

  return gridInfo
}
