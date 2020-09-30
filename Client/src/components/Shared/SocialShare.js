import React from 'react'
import { useRecoilValue } from 'recoil'
import { getOgImage } from '../../lib/data-utils'
import { clickedCellState, questionsState } from '../../state'
import styles from './SocialShare.module.css'

export const SocialShare = () => {
  const cell = useRecoilValue(clickedCellState)
  const questions = useRecoilValue(questionsState)

  const { question } = cell.answer
  const currentQuestion = questions.find(({ prompt }) => prompt === question)

  const twitterText = encodeURIComponent(`${question}... @centerforarchitecture #visualizeNYC2021`)
  const facebookText = `${twitterText}${encodeURIComponent(
    `\n\nPrompt by ${currentQuestion?.author}, ${currentQuestion?.role}`
  )}`

  const fbAppId = '224554204617179'
  const { href } = window.location
  const encodedHref = encodeURI(href)
  const fill = '#FFFFFF'

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodedHref}&text=${twitterText}`
  const facebookHref = `https://www.facebook.com/dialog/share?app_id=${fbAppId}&display=popup&href=${encodedHref}&caption=${facebookText}`

  return (
    <div className={styles.wrapper}>
      <span>Share</span>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        download
        href={getOgImage(cell)}
        title="Download the image of the answer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
          <path
            fill={fill}
            d="M16.29,2.24c0.91,0.22,1.08,0.88,1.08,1.7c0,5.23,0.02,6.42,0.02,11.65v0.63c0.27-0.24,0.44-0.39,0.6-0.55c1.21-1.19,2.41-2.4,3.63-3.58c0.93-0.9,1.33-0.89,2.31-0.02c1.68,1.49,1.71,1.86,0.15,3.45c-2.57,2.59-5.15,5.17-7.73,7.74c-0.59,0.58-1.54,0.58-2.13,0c-2.73-2.72-5.46-5.44-8.18-8.18c-1.01-1.02-0.99-1.4,0-2.44c1.85-1.94,2.09-1.35,3.37-0.07c1.2,1.19,2.35,2.43,3.52,3.64l0.19-0.13l0.03-0.57c0.01-5.17,0.02-6.28,0.02-11.44c0-0.79,0.1-1.49,0.95-1.83H16.29z"
          />
          <path
            fill={fill}
            d="M3.93,30c-1.28-0.35-1.35-0.46-1.38-1.84c-0.05-2.22,0.18-2.39,2.36-2.39c6.98,0.02,13.95,0,20.93,0.01c2.02,0,2.17,0.16,2.16,2.17l0,0.2c-0.01,1.38-0.09,1.49-1.35,1.83C18.94,30,11.62,30,3.93,30"
          />
        </svg>
      </a>

      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        href={twitterHref}
        title="Share answer on Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
          <path
            fill={fill}
            d="M2.97,12.14c0.78,0.21,1.43,0.38,2.08,0.56l0.17-0.14c-2.26-2.17-2.84-4.63-1.47-7.63C7,8.62,10.9,10.7,15.67,11c0.11-2.18-0.31-3.71,2.9-5.83c1.96-1.29,4.48-1.29,6.48-0.07c0.97,0.59,1.75,0.41,2.68,0.04c0.5-0.2,0.98-0.44,1.49-0.66c0.04,0.77-0.18,1.1-1.74,2.96c0.85-0.22,1.69-0.43,2.54-0.65l0.15,0.14c-0.72,0.74-1.41,1.53-2.19,2.21c-0.36,0.31-0.58,0.76-0.58,1.24c-0.06,7.12-4.68,14.08-12.12,16.08c-4.31,1.16-9.52,0.47-13.32-2.01c3.1,0.14,5.79-0.51,8.36-2.4c-2.57-0.4-4.34-1.63-5.28-4.02c0.75-0.04,1.36-0.07,1.97-0.1l0.06-0.2C4.58,16.69,3.08,14.96,2.97,12.14"
          />
        </svg>
      </a>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        href={facebookHref}
        title="Share the answer on Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
          <path
            fill={fill}
            d="M18.49,23.03c0,2.04-0.03,4.08,0.02,6.12c0.01,0.69-0.22,0.87-0.88,0.84c-1.37-0.05-2.74-0.05-4.1,0c-0.67,0.03-0.82-0.23-0.82-0.84c0.02-4.06,0.01-8.11,0.01-12.17c0-0.97,0-0.97-0.95-0.97c-0.49,0-0.98,0.04-1.46-0.03l-0.47-0.48c-0.04-1.27-0.02-2.55-0.03-3.82c0-0.4,0.2-0.52,0.56-0.52c0.55,0.01,1.11-0.02,1.67,0.01c0.51,0.03,0.69-0.18,0.69-0.69c0-1.2-0.01-2.41,0.1-3.61c0.22-2.42,2.04-4.39,4.45-4.68c1.65-0.2,3.33-0.14,5-0.2c0.44-0.02,0.55,0.22,0.55,0.6c-0.01,1.23-0.01,2.46,0,3.69c0,0.42-0.18,0.58-0.59,0.57c-0.65-0.01-1.3-0.02-1.94,0C19.35,6.9,18.53,7.64,18.5,8.6c-0.02,0.6,0.02,1.21-0.02,1.81c-0.04,0.57,0.15,0.79,0.73,0.77c0.99-0.04,1.99,0.01,2.98-0.02c0.38-0.01,0.66,0.28,0.61,0.66c-0.13,1.2-0.24,2.4-0.34,3.6c-0.03,0.35-0.32,0.61-0.68,0.6c-0.88-0.02-1.76,0.02-2.63-0.01c-0.52-0.02-0.68,0.19-0.68,0.69C18.5,18.81,18.49,20.92,18.49,23.03"
          />
        </svg>
      </a>
    </div>
  )
}
