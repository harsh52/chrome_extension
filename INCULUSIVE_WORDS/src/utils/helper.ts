export type WordMap = {
  [inclusiveWord: string]: string[]
}

export const initialWordState: WordMap = {
  happy: ["joyful", "content", "pleased"],
  sad: ["unhappy", "mournful", "melancholy"],
  smart: ["intelligent", "clever", "bright"],
}

export function getAlternativeWords(
  inclusiveWord: string
): string[] | undefined {
  return initialWordState[inclusiveWord]
}

// const wordToCheck = "happy"
// const alternativeWords = getAlternativeWords(wordToCheck)

// if (alternativeWords) {
//   console.log(`Inclusive Word: ${wordToCheck}`)
//   console.log(`Alternatives: ${alternativeWords.join(", ")}`)
// } else {
//   console.log(`No alternatives found for ${wordToCheck}`)
// }
