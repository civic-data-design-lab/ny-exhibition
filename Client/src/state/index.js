import { difference, shuffle } from 'lodash'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { API_ROOT, QUERYSTRING_KEYS, ROUTES, THEME_MAP_BY_LABEL } from '../lib/constants'
import { getRandomItem } from '../lib/random-utils'
import { parse, stringify } from '../lib/url-utils'

const addIds = (data) =>
  data.map((d, i) => ({ ...d, id: i + 1, themeId: THEME_MAP_BY_LABEL[d.theme].id }))

export const questionsState = atom({
  key: 'questionsState',
  default: fetch(`${API_ROOT}/question`)
    .then((resp) => resp.json())
    .then((resp) => shuffle(addIds(resp))),
})

export const randomQuestionsState = selector({
  key: 'randomQuestionsState',
  get: ({ get }) => {
    const questions = get(questionsState)
    return shuffle([...questions])
  },
})

export const questionsLengthState = selector({
  key: 'questionsLengthState',
  get: ({ get }) => {
    const questions = get(questionsState)
    return questions.length
  },
})

export const questionsIdsState = selector({
  key: 'questionsIdsState',
  get: ({ get }) => {
    const questions = get(questionsState)
    return questions.map(({ id }) => id)
  },
})

export const questionHistoryState = atom({
  key: 'questionHistoryState',
  default: [],
})

export const questionsAvailableIdsState = selector({
  key: 'questionsAvailableIdsState',
  get: ({ get }) => {
    const questionsIds = get(questionsIdsState)
    const questionHistory = get(questionHistoryState)
    return difference(questionsIds, questionHistory)
  },
})

export const questionsAvailableIdsLengthState = selector({
  key: 'questionsAvailableIdsLengthState',
  get: ({ get }) => {
    const questionsAvailableIds = get(questionsAvailableIdsState)
    return questionsAvailableIds.length
  },
})

export const currentQuestionIdState = atom({
  key: 'currentQuestionIdState',
  default: null,
})

export const currentQuestionState = selector({
  key: 'currentQuestionState',
  get: ({ get }) => {
    const currentQuestionId = get(currentQuestionIdState)
    const questions = get(questionsState)
    return currentQuestionId ? questions.find(({ id }) => id === currentQuestionId) : null
  },
})

export const nycMapState = atom({
  key: 'nycMapState',
  default: undefined,
})

export const showLabelsState = atom({
  key: 'showLabelsState',
  default: true,
})

export const zipCodeState = atom({
  key: 'zipCodeState',
  default: null,
})

export const minimapInfoState = atom({
  key: 'minimapInfoState',
  default: { x: 0, y: 0, width: 1, height: 1, svgWidth: 1, svgHeight: 1 },
})

export const clickedCellState = atom({
  key: 'clickedCellState',
  default: undefined,
})

export const useUpdateClickedCell = () => {
  const set = useSetRecoilState(clickedCellState)

  // reset state on unmount
  useEffect(() => {
    return () => set(undefined)
    // eslint-disable-next-line
  }, [])

  return (cell) => set((old) => (old?.answer?.id === cell.answer.id ? undefined : cell))
}

// If there's time, code below could be refactored so that those
// three hooks become one, updating the querystring, cleaning up
// states possibly interfering and setting the new id
export const usePromptRandomQuestion = () => {
  const setClicked = useSetRecoilState(clickedCellState)
  const setQuestionHistory = useSetRecoilState(questionHistoryState)
  const questionsAvailableIds = useRecoilValue(questionsAvailableIdsState)
  const history = useHistory()

  return () => {
    // Reset question history if all questions have been answered
    if (!questionsAvailableIds.length) {
      setQuestionHistory([])
    }

    // Unset clicked cell popup when prompt overlay is opened
    setClicked(undefined)

    // Pick random new question to present
    const newQuestionId = getRandomItem(questionsAvailableIds)
    const { pathname, search: oldSearch } = history.location
    const parsedOldSearch = parse(oldSearch)
    const stringifiedNewSearch = stringify({
      ...parsedOldSearch,
      [QUERYSTRING_KEYS.QUESTION_ID]: newQuestionId,
    })
    history.push({ pathname, search: stringifiedNewSearch })
  }
}

export const usePickRandomQuestion = () => {
  const history = useHistory()
  const questionsIds = useRecoilValue(questionsIdsState)

  return () => {
    const { pathname, search } = history.location
    const parsedSearch = parse(search)
    if (!parsedSearch[QUERYSTRING_KEYS.QUESTION_ID] && pathname === ROUTES.HOME) {
      const randomId = getRandomItem(questionsIds)
      const newSearch = { ...parsedSearch, [QUERYSTRING_KEYS.QUESTION_ID]: randomId }
      const stringifiedNewSearch = stringify(newSearch)
      history.push({ pathname, search: stringifiedNewSearch })
    }
  }
}

export const useShowCurrentQuestion = () => {
  const location = useLocation()
  const setCurrentQuestionId = useSetRecoilState(currentQuestionIdState)

  return () => {
    const parsedSearch = parse(location.search)
    const questionId = parsedSearch[QUERYSTRING_KEYS.QUESTION_ID] || null
    setCurrentQuestionId(questionId)
  }
}
