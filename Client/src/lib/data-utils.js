import { API_ROOT } from './constants'

export const mapObject = (obj, keyMapper, valueMapper) => {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v], i) => [keyMapper(k, i), valueMapper(v, i)])
  )
}

export const getOgImage = (cell) =>
  cell?.answer?.id ? `${API_ROOT}/static/og_image_${cell.answer.id}.png` : ''
