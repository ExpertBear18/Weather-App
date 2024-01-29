import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  const success = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
    setCoords(obj);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {
      const APIkey = 'af198671b279d8b8eb9ef98d8feecb6e'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`
      axios.get(url)
        .then(res => {
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(2),
            farenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
          }
          setTemp(obj)
          setWeather(res.data)})
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className='app'>
      <WeatherCard
        weather={weather}
        temp={temp}
      />
    </div>
  )
}

export default App
