import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { parse } from 'query-string'
import { API_ROOT, DEBUG, THEMES } from '../../lib/constants'
import { flatMap, groupBy, identity, mapValues, uniq } from 'lodash'
import { fetchJson } from '../../lib/fetch-utils'
import { mapObject } from '../../lib/data-utils'

const getThemeId = (theme) => THEMES.find((t) => t.label === theme)?.id
const mapAnswer = (answer) => {
  const id = answer._id.$oid
  const questionThemeId = getThemeId(answer.theme)
  return { ...answer, id, questionThemeId }
}
const mapMultipleAnswers = (answers) => answers.map(mapAnswer)

const excludeIds = (json) => {
  // These are broken answers
  const stopValues = ['5f747443dad01b6dee954367']
  if (Array.isArray(json)) {
    return json.filter((item) => !stopValues.includes(item._id.$oid))
  } else {
    const mappedObject = mapValues(json, (row) =>
      row.filter((item) => !stopValues.includes(item._id.$oid))
    )
    const filteredEmptyArr = Object.fromEntries(
      Object.entries(mappedObject).filter(([k, arr]) => arr.length)
    )
    return filteredEmptyArr
  }
}

const groupbyDataMappers = {
  theme: (data) => mapObject(data, getThemeId, mapMultipleAnswers),
  zip_code: (data) => mapObject(data, identity, mapMultipleAnswers),
  word_freq: (data) => mapObject(data, identity, mapMultipleAnswers),
  none: mapMultipleAnswers,
}

export const useData = ({ threshold, groupby } = {}) => {
  const [data, setData] = useState([])
  const [loadState, setLoadState] = useState('loading')
  const history = useHistory()
  const { search } = history.location
  const parsedSearch = parse(search)

  useEffect(() => {
    if (threshold === 0) return
    async function fetchData() {
      try {
        if (DEBUG.MOCK_API_BEHAVIOR) {
          const dummy = await fetchJson('/dummy-answers.json')
          const sliced = dummy.slice(0, parsedSearch.slice ?? dummy.length)

          const mockGroupby = {
            none: identity,
            theme: (data) => groupBy(data, 'questionThemeId'),
            zip_code: (data) => groupBy(data, 'zip_code'),
            word_freq: (data) => {
              const uniqTags = uniq(flatMap(data, 'answerTags'))
              const tags = uniqTags
                .map((value) => {
                  const answers = data.filter((d) => d.answerTags.includes(value))
                  return [value, answers]
                })
                .slice(0, 10)

              return Object.fromEntries(tags)
            },
          }
          setData(mockGroupby[groupby || 'none'](sliced))
        } else {
          const json = await fetchJson(`${API_ROOT}/response`, { threshold, groupby })
          const filteredJson = excludeIds(json)
          const mapData = groupbyDataMappers[groupby || 'none']
          setData(mapData(filteredJson))
        }
        setLoadState('rest')
      } catch (e) {
        setLoadState('error')
      }
    }

    fetchData()

    // eslint-disable-next-line
  }, [threshold, groupby])

  return { data, loadState }
}
