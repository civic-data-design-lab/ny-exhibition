import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { minimapInfoState } from '../../state'

import { useDimensionChange } from '../../lib/useDimensionChange'
import { useScroll } from '../../lib/useScroll'

export function useMinimapUpdate(ref, svgWidth, svgHeight) {
  const setMinimapInfo = useSetRecoilState(minimapInfoState)
  useEffect(() => {
    setMinimapInfo((currVal) => ({ ...currVal, svgWidth, svgHeight }))
  }, [svgWidth, svgHeight, setMinimapInfo])

  useScroll(ref, (scroll) => setMinimapInfo((currVal) => ({ ...currVal, ...scroll })))
  useDimensionChange(ref, (dimensions) =>
    setMinimapInfo((currVal) => ({ ...currVal, ...dimensions }))
  )
}
