import { useEffect } from 'react'

export function useEventListener(ref, event, callback) {
  useEffect(() => {
    const el = 'current' in ref ? ref.current : ref
    if (!el) return
    el.addEventListener(event, callback)
    return () => el.removeEventListener(event, callback)
  }, [ref, event, callback])
}
