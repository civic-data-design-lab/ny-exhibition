import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { parse, stringify, toFormData } from '../../lib/url-utils'
import { sleep } from '../../lib/debug-utils'
import { QUERYSTRING_KEYS, THEME_MAP, API_ROOT, DEBUG } from '../../lib/constants'
import {
  questionsAvailableIdsState,
  currentQuestionState,
  zipCodeState,
  questionHistoryState,
  usePromptRandomQuestion,
} from '../../state'
import { isValidZip } from '../../lib/zip-utils'
import styles from './QuestionModal.module.css'
import stylesUtils from '../../styles/utils.module.css'
import { MobileNotice } from './MobileNotice'

const STATUS_MESSAGES = {
  loading: 'Loading...',
  error: 'Error',
}

export const QuestionModal = () => {
  const questionsAvailableIds = useRecoilValue(questionsAvailableIdsState)
  const currentQuestion = useRecoilValue(currentQuestionState)
  const setQuestionHistory = useSetRecoilState(questionHistoryState)
  const promptRandomQuestion = usePromptRandomQuestion()
  const history = useHistory()

  const [answer, setAnswer] = useState('')
  const [zip, setZip] = useRecoilState(zipCodeState)
  const [showPart2, setShowPart2] = useState(false)
  const inputAnswerRef = useRef(null)
  const inputZipRef = useRef(null)

  const [submitStatusMessage, setSubmitStatusMessage] = useState('rest')
  const [zipErrorMessage, setZipErrorMessage] = useState(null)

  const answerInputFilterChars = (e) => {
    // stop value is enter key
    const stopValues = [13]
    if (stopValues.includes(e.which)) {
      e.preventDefault()
    }
  }

  const zipInputFilterChars = (e) => {
    // pass values are null, backspace and numbers between 0 and 9
    const passValues = [0, 8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
    if (!passValues.includes(e.which)) {
      e.preventDefault()
    }
  }

  const reset = () => {
    setSubmitStatusMessage('rest')
    setAnswer('')
    // This should not be here. The right way to do it is reduce
    // the number of click event listeners on the empty cells by
    // putting a button as big as the viewport below the viz.
    setTimeout(() => {
      setShowPart2(false)
    }, 0)
  }

  const submit = async () => {
    setSubmitStatusMessage('loading')
    // Answer is not sanitized manually as React controlled components do it by default
    try {
      const body = {
        question: currentQuestion.prompt,
        response: answer,
        zip_code: zip,
        theme: THEME_MAP[currentQuestion.themeId].label,
      }

      if (DEBUG.MOCK_API_BEHAVIOR) {
        await sleep(1500)
      } else {
        await fetch(`${API_ROOT}/response`, {
          method: 'POST',
          body: toFormData(body),
          mode: 'cors',
          headers: { 'Access-Control-Allow-Origin': '*' },
        })
      }

      reset()
      setQuestionHistory((questionHistory) => [...questionHistory, id])
    } catch (err) {
      setSubmitStatusMessage('error')
      console.log(err)
    }
  }

  const updateAnswer = (e) => {
    setAnswer(e.target.value)
  }

  const proceed = async (e) => {
    e.preventDefault()
    if (answer) {
      // If the ZIP code is already there, sumbit the answer right away
      zip ? await submit() : setShowPart2(true)
    }
  }

  const storeZip = async (e) => {
    e.preventDefault()
    const { value } = inputZipRef.current
    if (!value) {
      await submit()
    } else {
      if (isValidZip(value)) {
        setZipErrorMessage(null)
        setZip(value)
        await submit()
      } else {
        setZipErrorMessage('Sorry, this is not a valid NYC zip code. Update and retry')
      }
    }
  }

  const focusAnswerInput = () => {
    inputAnswerRef.current && inputAnswerRef.current.focus()
  }

  const focusZipInput = () => {
    inputZipRef.current && inputZipRef.current.focus()
  }

  const close = (e) => {
    e.preventDefault()
    // Closing the modal is actually just removing
    // the prompt key from the query string in the url
    const { pathname, search: oldSearch } = history.location
    const parsedOldSearch = parse(oldSearch)
    const newSearch = { ...parsedOldSearch }
    delete newSearch[QUERYSTRING_KEYS.QUESTION_ID]
    const stringifiedNewSearch = stringify(newSearch)
    history.push({ pathname, search: stringifiedNewSearch })
    reset()
  }

  // this effect causes a warning on the Recoil Batcher component
  // known issue, Recoil team working on a fix here:
  // https://github.com/facebookexperimental/Recoil/issues/12
  useEffect(promptRandomQuestion, [questionsAvailableIds])
  useEffect(focusAnswerInput, [currentQuestion])
  useEffect(focusZipInput, [showPart2])

  if (!currentQuestion) return null

  const { id, themeId, prompt, author, role } = currentQuestion
  const { fullTint, halfTint } = THEME_MAP[themeId].color

  return (
    <div className={styles.wrapper}>
      <button className={styles.closeBtn} onClick={close} aria-label="close panel" />

      <div className={styles.modal}>
        <div className={styles.inner}>
          {!showPart2 ? (
            <div className={styles.part1} style={{ backgroundColor: fullTint }}>
              <div>
                <span className={styles.prompt}>{prompt}...</span>{' '}
                <span className={styles.author} style={{ color: halfTint }}>
                  {author}, {role}
                </span>
              </div>
              <form className={styles.form}>
                <div>
                  <label htmlFor="input" className={styles.inputTextLabel}>
                    <span className={stylesUtils.screenreaderOnly}>Your answer</span>
                  </label>

                  <div className={styles.textarea}>
                    <textarea
                      maxLength={120}
                      spellCheck={false}
                      id="input"
                      className={`${styles.input} ${styles.textareaInput}`}
                      ref={inputAnswerRef}
                      value={answer}
                      onChange={updateAnswer}
                      onKeyPress={answerInputFilterChars}
                    />
                    <div className={styles.textareaOutput}>
                      <span>{answer}</span>
                    </div>
                    <div className={styles.textareaHint}>
                      <span>Fake underline</span>
                    </div>
                  </div>
                </div>

                <div className={styles.submitWrapper}>
                  <button
                    className={`${styles.submitBtn} ${answer && styles.submitBtnBig}`}
                    disabled={submitStatusMessage === 'loading'}
                    onClick={proceed}
                    aria-label="submit answer"
                    style={{ color: answer ? 'white' : halfTint }}
                  >
                    {zip ? 'Submit' : 'Next'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className={styles.part2}>
              <p>Live in NYC? Enter your zip code to add your answer to the map.</p>
              <form className={styles.form}>
                <div className={styles.zipField}>
                  <label htmlFor="zipInput" className={styles.inputTextLabel}>
                    <span className={stylesUtils.screenreaderOnly}>Enter ZIP code</span>
                  </label>
                  <input
                    maxLength={5}
                    id="zipInput"
                    type="number"
                    className={`${styles.input} ${styles.zipInput}`}
                    ref={inputZipRef}
                    onKeyPress={zipInputFilterChars}
                  />
                  {zipErrorMessage && (
                    <div className={styles.zipErrorMessage}>{zipErrorMessage}</div>
                  )}
                </div>

                <p>If you are outside NYC, there is no need to add your zip code.</p>

                <div className={styles.submitWrapper}>
                  <button
                    className={`${styles.submitBtn} ${styles.submitBtnBig}`}
                    disabled={submitStatusMessage === 'loading'}
                    onClick={storeZip}
                    aria-label="submit answer"
                  >
                    Submit
                  </button>
                </div>
              </form>

              {submitStatusMessage !== 'rest' && (
                <div className={styles.submitStatusMessage}>
                  <span>{STATUS_MESSAGES[submitStatusMessage]}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <MobileNotice />
      </div>
    </div>
  )
}
