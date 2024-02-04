import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
// import { TextField, Button, Container, Typography } from "@mui/material"
import { getAlternativeWords, WordMap, findMatchingWord } from "../utils/helper"
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
  AppBar,
  Toolbar,
  IconButton,
  Box,
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
      width: "500px",
      minHeight: "150px",
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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      width: "50px", // Adjust the width as needed
      marginRight: theme.spacing(1),
    },
    appBar: {
      background: "#27a0c6b8",
      marginBottom: theme.spacing(1),
    },
    highlightedWord: {
      textDecoration: "underline",
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

  // Function to add a new inclusive word and its alternative words
  const addWord = (inclusiveWord: string, alternatives: string[]) => {
    setinclusiveWords((prevWordState) => ({
      ...prevWordState,
      [inclusiveWord]: alternatives,
    }))
  }

  const inclusiveWordDetector = (inputWord: string) => {
    const individualWords = inputWord.split(" ")
    for (const word of individualWords) {
      findMatchingWord(word).then((inclusive_word) => {
        console.log(`inclusive_word: ${inclusive_word}`)
        const alternativeWords = getAlternativeWords(inclusive_word) // calling matches.yaml
        console.log(`alternativeWords ${alternativeWords}`)
        if (alternativeWords) {
          console.log(`Alternatives: ${alternativeWords}`)
          addWord(word, alternativeWords)
        }
      })
    }
  }

  useEffect(() => {
    console.log(`in useeffect ${inclusiveWords}`)
  }, [inclusiveWords])

  const handleSubmit = () => {
    console.log("Submitted:", inputValue)
    // Implement your submit logic here
    inclusiveWordDetector(inputValue)
  }

  const getHighlightedText = (
    text: string,
    inclusiveWords: WordMap,
    classes: Record<string, string>
  ) => {
    return Object.keys(inclusiveWords).reduce(
      (acc, word) =>
        acc.replace(
          new RegExp(`(${word})`, "gi"),
          (match) => `<span class=${classes.highlightedWord}>${match}</span>`
        ),
      text
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position='relative' className={classes.appBar}>
        <Toolbar>
          <img src='icon.png' alt='Logo' className={classes.logo} />
          <Typography variant='h6' className={classes.title}>
            Your App Name
          </Typography>
          {/* <IconButton
            edge='end'
            color='inherit'
            onClick={handleOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>

      <TextareaAutosize
        className={classes.textarea}
        aria-label='Type something'
        placeholder='Type something'
        maxRows={2}
        value={inputValue}
        onChange={handleInputChange}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: getHighlightedText(inputValue, inclusiveWords, classes),
        }}
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
