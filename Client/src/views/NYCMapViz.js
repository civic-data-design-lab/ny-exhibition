import React from 'react'
import { useRecoilValue } from 'recoil'
import { FullScreenMessage } from '../components/Shared/FullScreenMessage'
import { CartogramLayout } from '../components/NYCMapViz/CartogramLayout'
import { useData } from '../components/Shared/useData'
import { nycMapState } from '../state'

export const NYCMapViz = () => {
  const nycMap = useRecoilValue(nycMapState)
  const { data, loadState } = useData({
    groupby: 'zip_code',
    threshold: nycMap?.nCells ?? 0,
  })

  const states = {
    loading: <FullScreenMessage message="Loading..." />,
    rest: <CartogramLayout data={data} />,
    error: <FullScreenMessage message="An error occurred! Please, reload the page..." />,
  }

  return states[nycMap ? loadState : 'loading']
}
