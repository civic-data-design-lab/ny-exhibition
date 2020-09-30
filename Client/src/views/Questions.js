import React from 'react'
import { useHistory } from 'react-router-dom'
import { stringify } from '../lib/url-utils'
import styles from './Questions.module.css'
import { parse } from 'query-string'
import { QUERYSTRING_KEYS, THEME_MAP } from '../lib/constants'
import { useRecoilValue } from 'recoil'
import { questionsAvailableIdsState, randomQuestionsState } from '../state'

export const Questions = () => {
  const history = useHistory()
  const questionsAvailableIds = useRecoilValue(questionsAvailableIdsState)
  const randomQuestions = useRecoilValue(randomQuestionsState)

  const setCurrentQuestion = (questionId) => (e) => {
    e.preventDefault()

    const { pathname, search: oldSearch } = history.location
    const parsedOldSearch = parse(oldSearch)
    const stringifiedNewSearch = stringify({
      ...parsedOldSearch,
      [QUERYSTRING_KEYS.QUESTION_ID]: questionId,
    })

    history.push({ pathname, search: stringifiedNewSearch })
  }

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>
        <div className={`${styles.gridItem} ${styles.gridItemDouble}`}>
          <span className={styles.intro}>
            Click on any prompt card to answer; clicking on empty cards allow you to answer a random
            prompt.
          </span>
        </div>

        {randomQuestions.map(({ id, themeId, prompt, author }, i) => {
          const backgroundColor = !themeId ? 'transparent' : THEME_MAP[themeId].color.fullTint
          const btnClassName = `${styles.btn} ${!themeId ? styles.btnIsEmpty : ''}`
          return (
            <div className={styles.gridItem} key={i}>
              <button
                disabled={!questionsAvailableIds.includes(id)}
                className={btnClassName}
                style={{ backgroundColor }}
                onClick={setCurrentQuestion(id)}
                aria-label={`Click to open prompt to answer question: ${prompt}`}
              />
              <div className={styles.text}>
                <span>{prompt}...</span>
                <br />
                <br />
                <span>{author}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
