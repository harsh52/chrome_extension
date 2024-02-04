import React, { useEffect, useState } from "react"
import { OpenWeatherData, fetchOpenWeatherData } from "../../utils/api"
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from "@material-ui/core"

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCardContainer: React.FC<{
  childern: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent> {children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color='secondary' onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

const WeatherCard: React.FC<{
  city: string
  onDelete?: () => void
}> = ({ city, onDelete }) => {
  const [weatherData, setweatherData] = useState<OpenWeatherData | null>(null)
  const [WeatherCardState, setWeatherCardState] = useState("loading")

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setweatherData(data)
        setWeatherCardState("ready")
      })

      .catch((err) => {
        console.log(err)
        setWeatherCardState("error")
      })
  }, [city])

  if (!weatherData) {
    return (
      <WeatherCardContainer childern onDelete={onDelete}>
        <Typography variant='body1'>
          {WeatherCardState == "loading"
            ? "loading.."
            : "Error not able load the city temp."}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer childern onDelete={onDelete}>
      <Typography variant='h5'>{weatherData.name}</Typography>
      <Typography variant='body1'>
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant='body1'>
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
