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

const yamlFilePath = "./matches.yaml" // Replace with your actual file path

const yamlInput = await fetchYamlFile(yamlFilePath)

const initialWordState: WordMap = parseYamlToWordMap(yamlInput)

export function getAlternativeWords(
  inclusiveWord: string
): string[] | undefined {
  return initialWordState[inclusiveWord]
}
