import { useEventListener } from './useEventListener'

export function useScroll(ref, callback) {
  useEventListener(ref, 'scroll', () => {
    callback({ x: ref.current.scrollLeft, y: ref.current.scrollTop })
  })
}
