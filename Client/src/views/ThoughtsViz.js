import React from 'react'
import { PerlinNoiseLayout } from '../components/ThoughtsViz/PerlinNoiseLayout'
import { useData } from '../components/Shared/useData'
import { FullScreenMessage } from '../components/Shared/FullScreenMessage'
import { getGridInfo } from '../components/Shared/useGrid'

export const ThoughtsViz = () => {
  const { data, loadState } = useData({ threshold: getGridInfo().nCells })

  const states = {
    loading: <FullScreenMessage message="Loading..." />,
    rest: <PerlinNoiseLayout data={data} />,
    error: <FullScreenMessage message="An error occurred! Please, reload the page..." />,
  }

  return states[loadState]
}
