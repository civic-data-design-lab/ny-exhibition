import { isNil } from 'lodash'

export const fetchJson = async (url, params = {}) => {
  const stringParams = Object.entries(params)
    .filter(([, v]) => !isNil(v))
    .map((pair) => pair.join('='))
    .join('&')

  const res = await window.fetch(`${url}?${stringParams}`)
  const json = await res.json()

  return json
}
