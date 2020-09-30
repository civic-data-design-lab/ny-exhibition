import React from 'react'
import { TreemapLayout } from '../components/FutureViz/TreemapLayout'
import { FullScreenMessage } from '../components/Shared/FullScreenMessage'
import { useData } from '../components/Shared/useData'
import { getGridInfo } from '../components/Shared/useGrid'

export const FutureViz = () => {
  const { data, loadState } = useData({
    groupby: 'theme',
    threshold: getGridInfo().nCells,
  })

  const treeData = Object.entries(data).map(([questionThemeId, answers]) => ({
    questionThemeId,
    answers,
  }))

  const states = {
    loading: <FullScreenMessage message="Loading..." />,
    rest: <TreemapLayout data={treeData} />,
    error: <FullScreenMessage message="An error occurred! Please, reload the page..." />,
  }

  return states[loadState]
}
