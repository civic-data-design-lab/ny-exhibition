const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { features: geojson } = require('./2000m_zipgrid.json')

const zipCodes = geojson.filter((f) => f.properties.ZIPCODE)

const getAllY = (f) => f.geometry.coordinates[0][0].flatMap((c) => c[1])
const getAllX = (f) => f.geometry.coordinates[0][0].flatMap((c) => c[0])

const top = _.min(zipCodes.flatMap(getAllY))
const bottom = _.max(zipCodes.flatMap(getAllY))
const left = _.min(zipCodes.flatMap(getAllX))
const right = _.max(zipCodes.flatMap(getAllX))

const side = _.mean(zipCodes.map((f) => _.max(getAllX(f)) - _.min(getAllX(f))))

const cols = Math.round((right - left) / side)
const rows = Math.round((bottom - top) / side)
const cells = zipCodes.map((f) => ({
  x: Math.round((_.min(getAllX(f)) - left) / side),
  y: cols - Math.round((_.min(getAllY(f)) - top) / side),
  zipCode: f.properties.ZIPCODE,
  id: f.properties.id,
}))

const groupedByPos = _.groupBy(cells, (c) => `${c.x}-${c.y}`)
const cellsWithMultipleZipCode = Object.values(groupedByPos).map((cells) => {
  const zipCodes = cells.map((c) => c.zipCode)
  return { zipCodes, x: cells[0].x, y: cells[0].y }
})

fs.writeFileSync(
  path.resolve(__dirname, '../src/data/nyc.json'),
  JSON.stringify(
    { cols, rows, nCells: cellsWithMultipleZipCode.length, cells: cellsWithMultipleZipCode },
    null,
    2
  )
)
