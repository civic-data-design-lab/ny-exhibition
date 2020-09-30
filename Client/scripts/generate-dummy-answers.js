const fs = require('fs')
const path = require('path')
const randomSentence = require('random-sentence')
const randomWords = require('random-words')
const zipCodesFile = path.resolve(__dirname, '../src/data/ny-zip-codes.json')
const outputFile = path.resolve(__dirname, '../public/dummy-answers.json')

// total number of answers
const answersAmount = 10000

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// number of random tags to create
const randomWordsInUse = randomWords({ exactly: 100 })

// all ny valid zip codes
const zipCodes = JSON.parse(fs.readFileSync(zipCodesFile))

// questions
const questions = [[], [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]

const answers = Array(answersAmount)
  .fill(0)
  .map((_, id) => {
    // one of the four themes
    const questionThemeId = getRandomInt(1, 4)
    // one of the sixteen answers
    const questionId = questions[questionThemeId][getRandomInt(0, 3)]

    // the text of the answer
    const response = randomSentence({ min: 5, max: 9 })
    // the zip code of the answer
    const zip_codeMaybe = zipCodes[getRandomInt(0, zipCodes.length - 1)]
    const zip_code = getRandomInt(0, 10) < 3 ? null : zip_codeMaybe

    // the tags of the answer
    const answerRandomTagsAmount = getRandomInt(0, 3)
    const answerRandomTagsIndex = Array(answerRandomTagsAmount)
      .fill(0)
      .map(() => getRandomInt(0, 99))
    const answerTags = answerRandomTagsIndex.map(
      (randomTagIndex) => randomWordsInUse[randomTagIndex]
    )

    return {
      id,
      response,
      answerTags,
      zip_code,
      questionId,
      questionThemeId,
    }
  })

fs.writeFileSync(outputFile, JSON.stringify(answers))
