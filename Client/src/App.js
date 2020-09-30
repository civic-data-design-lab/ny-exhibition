import React, { Suspense } from 'react'
import { useMedia } from 'react-media'
import { Desktop } from './views/Desktop'
import { Mobile } from './views/Mobile'
import { FullScreenMessage } from './components/Shared/FullScreenMessage'

export const App = () => {
  const isMobile = useMedia({ query: '(max-width: 768px)' })

  return (
    <Suspense fallback={<FullScreenMessage message={'Loading...'} />}>
      {isMobile ? <Mobile /> : <Desktop />}
    </Suspense>
  )
}
