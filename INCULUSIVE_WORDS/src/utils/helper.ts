// export type WordMap = {
//   [inclusiveWord: string]: string[]
// }

// export const initialWordState: WordMap = {
//   happy: ["joyful", "content", "pleased"],
//   sad: ["unhappy", "mournful", "melancholy"],
//   smart: ["intelligent", "clever", "bright"],
// }

// export function getAlternativeWords(
//   inclusiveWord: string
// ): string[] | undefined {
//   return initialWordState[inclusiveWord]
// }

import * as yaml from "js-yaml"

export type WordMap = {
  [inclusiveWord: string]: string[]
}

const parseYamlToWordMap = (yamlInput: string): WordMap => {
  const parsedYaml = yaml.load(yamlInput)

  if (parsedYaml && typeof parsedYaml === "object") {
    const wordMap: WordMap = {}

    for (const key in parsedYaml) {
      if (Array.isArray(parsedYaml[key])) {
        wordMap[key] = parsedYaml[key]
      }
    }

    return wordMap
  }

  return {}
}

const fetchYamlFile = async (filePath: string): Promise<string> => {
  try {
    const response = await fetch(filePath)
    if (response.ok) {
      return await response.text()
    } else {
      console.error(`Error fetching YAML file: ${response.statusText}`)
      return ""
    }
  } catch (error) {
    console.error(`Error fetching YAML file: ${error.message}`)
    return ""
  }
}

const yamlFilePath = "./matches.yaml"

const yamlInput = await fetchYamlFile(yamlFilePath)

const initialWordState: WordMap = parseYamlToWordMap(yamlInput)

export function getAlternativeWords(
  inclusiveWord: string
): string[] | undefined {
  return initialWordState[inclusiveWord]
}

/// test
// import * as yaml from "js-yaml"
// import fetch from "node-fetch"

interface MatchRule {
  regex: string
  inclusive_word: string
}

interface MatchConfig {
  [key: string]: MatchRule[]
}

const readYamlFromUrl = async (url: string): Promise<MatchConfig> => {
  try {
    const response = await fetch(url)
    const text = await response.text()
    const yamlData = yaml.load(text) as MatchConfig
    return yamlData
  } catch (error) {
    throw new Error(`Error reading YAML file from URL: ${error.message}`)
  }
}

const yamlFileUrl = "./terms.yaml"

const initializeConfig = async () => {
  try {
    const config: MatchConfig = await readYamlFromUrl(yamlFileUrl)
    return config
  } catch (error) {
    console.error("Error initializing config:", error.message)
    throw error // Re-throw the error to indicate initialization failure
  }
}

const config = await initializeConfig()

export const findMatchingWord = async (
  inputWord: string
): Promise<string | undefined> => {
  try {
    // const config = await initializeConfig()

    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const rules = config[key]
        console.log(`rules: ${rules}`)
        // for (const rule of rules) {
        const regex = new RegExp(rules[0].regex)
        console.log(`regex: ${regex}`)
        if (regex.source !== "(?:)") {
          if (regex.test(inputWord)) {
            return rules[1].inclusive_word
          }
        }
        // }
      }
    }
    return undefined
  } catch (error) {
    console.error("Error finding matching word:", error.message)
    return undefined
  }
}
// Example usage

// const inputWord = "happy"

// try {
//   //   const config = await readYamlFromUrl(yamlFileUrl)
//   const result = findMatchingWord(inputWord)

//   if (result !== undefined) {
//     console.log(`Matching word found: ${result}`)
//   } else {
//     console.log("No matching word found.")
//   }
// } catch (error) {
//   console.error(error.message)
// }
