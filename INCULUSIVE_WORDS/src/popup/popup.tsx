import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
// import { TextField, Button, Container, Typography } from "@mui/material"
import { getAlternativeWords, initialWordState, WordMap } from "../utils/helper"
import {
  TextareaAutosize,
  Button,
  Theme,
  createStyles,
  makeStyles,
  Card,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core"

import "./popup.css"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textarea: {
      width: "300px",
      minHeight: "50px",
      padding: theme.spacing(1),
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      resize: "none",
      marginBottom: theme.spacing(2),
    },
    submitButton: {
      margin: theme.spacing(2),
    },
    container: {
      marginTop: theme.spacing(4),
    },
    card: {
      marginBottom: theme.spacing(2),
    },
    alternatives: {
      marginTop: theme.spacing(1),
    },
  })
)

const App: React.FC<{}> = () => {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState<string>("")
  const [inclusiveWords, setinclusiveWords] = useState<WordMap>({})

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  const addWord = (inclusiveWord: string, alternatives: string[]) => {
    setinclusiveWords((prevWordState) => ({
      ...prevWordState,
      [inclusiveWord]: alternatives,
    }))
  }

  const inclusiveWordDetector = (inputWord: string) => {
    const alternativeWords = getAlternativeWords(inputWord)
    if (alternativeWords) {
      console.log(`Alternatives: ${alternativeWords}`)
      addWord(inputWord, alternativeWords)
    }
  }

  useEffect(() => {
    console.log(`in useeffect ${inclusiveWords}`)
  }, [inclusiveWords])

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log("Submitted:", inputValue)
    inclusiveWordDetector(inputValue)
  }

  return (
    <div className={classes.root}>
      <TextareaAutosize
        className={classes.textarea}
        aria-label='Type something'
        placeholder='Type something'
        maxRows={2}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant='contained'
        color='primary'
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Container className={classes.container}>
        {Object.keys(inclusiveWords).map((inclusiveWord) => (
          <Card key={inclusiveWord} className={classes.card}>
            <CardContent>
              <Typography variant='h5'>{inclusiveWord}</Typography>
              <Typography
                className={classes.alternatives}
                color='textSecondary'
              >
                Alternatives: {inclusiveWords[inclusiveWord].join(", ")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
