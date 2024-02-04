import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import WeatherCard from "./WeatherCard"
import { Box, Grid, IconButton, InputBase, Paper } from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import { getStoredCities, setStoredCities } from "../utils/storage"

const App: React.FC<{}> = () => {
  useEffect(() => {
    getStoredCities().then((cities) => setcities(cities))
  }, [])

  const [cities, setcities] = useState<string[]>([
    "Bangalore",
    "New York",
    "error",
  ])
  const [cityInput, setcityInput] = useState("")

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

  return (
    <Box mx='8px' my='16px'>
      <Grid container>
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
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
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
