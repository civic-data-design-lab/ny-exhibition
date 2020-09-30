import { debounce } from 'lodash'
import { useEffect } from 'react'
import { useEventListener } from './useEventListener'

export function useDimensionChange(ref, callback, debounceTime = 200) {
  function handleResize() {
    const el = ref.current
    if (!el) return
    const bbox = el.getBoundingClientRect()
    callback({ width: bbox.width, height: bbox.height })
  }

  const debouncedHandler = debounce(handleResize, debounceTime)

  useEffect(handleResize, [])
  useEventListener(window, 'resize', debouncedHandler)
}
