import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import WeatherCard from "./WeatherCard"
import { Box, Grid, IconButton, InputBase, Paper } from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import {
  getStoredCities,
  setStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage"

const App: React.FC<{}> = () => {
  useEffect(() => {
    getStoredCities().then((cities) => setcities(cities))
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const [cities, setcities] = useState<string[]>([
    "Bangalore",
    "New York",
    "error",
  ])
  const [cityInput, setcityInput] = useState("")
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  const handleCityButtonClick = () => {
    if (cityInput === "") {
      return
    }
    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setcities(updatedCities)
      setcityInput("")
    })
  }

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setcities(updatedCities)
    })
  }

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    }
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }

  if (!options) {
    return null
  }

  return (
    <Box mx='8px' my='16px'>
      <Grid container justifyContent='space-evenly'>
        <Grid item>
          <Paper>
            <Box px='15px' py='5px'>
              <InputBase
                placeholder='Add a city name'
                value={cityInput}
                onChange={(event) => setcityInput(event.target.value)}
              ></InputBase>
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon></AddIcon>
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          tempScale={options.tempScale}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height='16px' />
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
