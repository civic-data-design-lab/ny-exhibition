import qs from 'query-string'
import { QUERYSTRING_KEYS } from './constants'
import { isEmpty } from 'lodash'

const keysMapFn = {
  [QUERYSTRING_KEYS.QUESTION_ID]: (val) => parseInt(val, 10),
  slice: (val) => parseInt(val, 10),
}

export const parse = (str) => {
  const parsed = qs.parse(str)
  const mapped = Object.keys(parsed).reduce(
    (acc, nextKey) => ({ ...acc, [nextKey]: keysMapFn[nextKey](parsed[nextKey]) }),
    {}
  )
  return mapped
}

export const stringify = (obj) => {
  return isEmpty(obj) ? '' : `?${qs.stringify(obj)}`
}

export const toFormData = (obj) => {
  const formData = new FormData()

  for (let key in obj) {
    formData.append(key, obj[key])
  }

  return formData
}
