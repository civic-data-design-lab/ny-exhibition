const randomElement = (arr) => {
  const i = Math.round(Math.random() * (arr.length - 1))
  return [arr[i], i]
}

const buildGrid = (cols, rows) => {
  const grid = Array(cols)
    .fill()
    .map((_, x) =>
      Array(rows)
        .fill()
        .map((_, y) => ({ x, y, active: false, neighbours: [], freeNeighbours: [] }))
    )

  // add neighbours
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const cell = grid[x][y]

      const neighbours = [
        grid[x - 1]?.[y],
        grid[x + 1]?.[y],
        grid[x][y - 1],
        grid[x][y + 1],
        // grid[x - 1]?.[y - 1],
        // grid[x + 1]?.[y - 1],
        // grid[x - 1]?.[y + 1],
        // grid[x + 1]?.[y + 1],
      ].filter((n) => n)

      cell.neighbours = neighbours
      cell.freeNeighbours = neighbours
    }
  }

  return grid
}

export function noisyGrid(cols, rows, amount) {
  const grid = buildGrid(cols, rows)
  const activeCells = []

  function activateCell(cell) {
    cell.active = true
    cell.neighbours.forEach((c) => (c.freeNeighbours = c.freeNeighbours.filter((n) => !n.active)))
    activeCells.push(cell)
  }

  // Choose randomly from every free cell
  function activateFromFreeCells(amount) {
    const freeCells = grid.flat().filter((n) => !n.active)
    for (let i = 0; i < amount; i++) {
      const [randomFreeCell, randomIndex] = randomElement(freeCells)

      activateCell(randomFreeCell)
      freeCells.splice(randomIndex, 1)
    }
  }

  // Choose randomly near active cells
  function activateFromNeighbours(amount) {
    for (let i = 0; i < amount; i++) {
      let randomActiveCell

      do {
        ;[randomActiveCell] = randomElement(activeCells)
      } while (randomActiveCell.freeNeighbours.length <= 0)

      const [randomFreeNeighbour] = randomElement(randomActiveCell.freeNeighbours)

      activateCell(randomFreeNeighbour)
    }
  }

  const steps = [
    { activateFn: activateFromFreeCells, perc: 0.2 },
    { activateFn: activateFromNeighbours, perc: 0.2 },
    { activateFn: activateFromFreeCells, perc: 0.2 },
    { activateFn: activateFromNeighbours },
  ]

  for (const { activateFn, perc } of steps) {
    const cellsAmount = perc ? Math.round(perc * amount) : amount - activeCells.length
    activateFn(cellsAmount)
  }

  return activeCells
}
