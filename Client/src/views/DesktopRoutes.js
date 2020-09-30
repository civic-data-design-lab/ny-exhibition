import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Questions } from './Questions'
import { ROUTES } from '../lib/constants'
import { ThoughtsViz } from './ThoughtsViz'
import { FutureViz } from './FutureViz'
import { VoiceViz } from './VoiceViz'
import { NYCMapViz } from './NYCMapViz'
import styles from './DesktopRoutes.module.css'

const routes = [
  {
    Component: Redirect,
    componentProps: { to: ROUTES.THOUGHTS_VIZ },
    routeProps: { path: ROUTES.HOME, exact: true },
  },
  {
    Component: Questions,
    routeProps: { path: ROUTES.QUESTIONS, exact: false },
  },
  {
    Component: ThoughtsViz,
    routeProps: { path: ROUTES.THOUGHTS_VIZ, exact: false },
  },
  {
    Component: FutureViz,
    routeProps: { path: ROUTES.FUTURE_VIZ, exact: false },
  },
  {
    Component: VoiceViz,
    routeProps: { path: ROUTES.VOICE_VIZ, exact: false },
  },
  {
    Component: NYCMapViz,
    routeProps: { path: ROUTES.NYC_MAP_VIZ, exact: false },
  },
]

export const DesktopRoutes = () => {
  return (
    <main className={styles.main}>
      <Switch>
        {routes.map(({ routeProps = {}, Component, componentProps = {} }, i) => {
          return (
            <Route {...routeProps} key={i}>
              <Component {...componentProps} />
            </Route>
          )
        })}
      </Switch>
    </main>
  )
}
