const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const json = require('./2000m_zipgrid.json')

const zip = json.features.map((f) => f.properties.ZIPCODE)

const sortedZip = _.compact(_.uniq(zip)).sort()

fs.writeFileSync(
  path.resolve(__dirname, '../src/data/ny-zip-codes.json'),
  JSON.stringify(sortedZip, null, 2)
)
