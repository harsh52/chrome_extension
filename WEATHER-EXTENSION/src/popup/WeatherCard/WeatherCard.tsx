import React, { useEffect, useState } from "react"
import { OpenWeatherData, fetchOpenWeatherData } from "../../utils/api"
import { Card, CardContent, Typography, Box } from "@material-ui/core"

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCardContainer: React.FC<{
  childern: React.ReactNode
}> = ({ children }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent> {children}</CardContent>
      </Card>
    </Box>
  )
}

const WeatherCard: React.FC<{
  city: string
}> = ({ city }) => {
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
      <WeatherCardContainer childern>
        <Typography variant='body1'>
          {WeatherCardState == "loading"
            ? "loading.."
            : "Error not able load the city temp."}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer childern>
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
