import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
const APIkey = 'af198671b279d8b8eb9ef98d8feecb6e'

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [textInput, setTextInput] = useState('')
  const [finder, setFinder] = useState()

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
        .finally(()=>{
          setIsLoading(false);
        })
    }
  }, [coords])

  useEffect(() => {
    if (textInput) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${APIkey}`;
      axios.get(url)
        .then(res => {
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(2),
            farenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
          }
          setTemp(obj);
          setFinder(res.data);
        })
        .catch(err => console.log(err))
    }
  }, [textInput])


  return (
    <div className='app'>
      {
        isLoading ?
          <img
          className='load__screen'
          src="https://usagif.com/wp-content/uploads/loading-25.gif" alt="gif cargando"/>
        :
        textInput ?
          <WeatherCard
            weather={finder}
            temp={temp}
            setTextInput={setTextInput}
          />
          :
          <WeatherCard
          weather={weather}
          temp={temp}
          setTextInput={setTextInput}
        />

      }
    </div>
  )
}

export default App
