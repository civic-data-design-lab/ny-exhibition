import React, { useEffect } from 'react'

import { useSetRecoilState } from 'recoil'
import { useLocation } from 'react-router-dom'
import { DesktopRoutes } from './DesktopRoutes'
import { HeaderDesktop } from '../components/Header/HeaderDesktop'
import { Footer } from '../components/Footer/Footer'
import { QuestionModal } from '../components/Shared/QuestionModal'
import { nycMapState, usePickRandomQuestion, useShowCurrentQuestion } from '../state'
import { Meta } from '../components/Shared/Meta'

export const Desktop = () => {
  const location = useLocation()
  const setNYCMap = useSetRecoilState(nycMapState)
  const pickRandomQuestionOnStartUp = usePickRandomQuestion()
  const showCurrentQuestion = useShowCurrentQuestion()

  const getMap = () => {
    import('../data/nyc.json').then(({ default: map }) => setNYCMap(map))
  }

  useEffect(getMap, [])
  useEffect(pickRandomQuestionOnStartUp, [])
  useEffect(showCurrentQuestion, [location])

  return (
    <>
      <Meta />
      <HeaderDesktop />
      <DesktopRoutes />
      <Footer />
      <QuestionModal />
    </>
  )
}
