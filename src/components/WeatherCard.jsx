import React, { useState } from "react";
import './styles/weatherCard.css'

const WeatherCard = ({ weather, temp }) => {
  const [changeTemp, setChangeTemp] = useState(true);

  const handleChange = () => {
    setChangeTemp(!changeTemp);
  };

  return (
    <section className="card__weather">
      <h1 className="weather__title">
        Weather App
      </h1>
      <h2 className="weather__city">
        {weather?.name}, {weather?.sys.country}
      </h2>
      <article className="weather__container1">
        <figure className="weather__fig">
          <img
            className="weather__img"
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}alt="weather icon" />
        </figure>
        <div className="weather__info">
          <h3 className="weather__clouds">{weather?.weather[0].description}</h3>
          <ul>
            <li>
              <span className="info__title">Wind speed: </span>
              <span className="info">{weather?.wind.speed}m/s</span>
            </li>
            <li>
              <span className="info__title">Clouds: </span>
              <span className="info">{weather?.clouds.all}%</span>
            </li>
            <li>
              <span className="info__title">Pressure: </span>
              <span className="info">{weather?.main.pressure} hPa</span>
            </li>
            <li>
              <span className="info__title">Humidity: </span>
              <span className="info">{weather?.main.humidity}%</span>
            </li>
          </ul>
        </div>
      </article>
      <div className="weather__container2">
        <h3 className="weather__temp">
          {
            changeTemp ?
              temp?.celsius + " °C"
            :
              temp?.farenheit + " °F"
          }
        </h3>
        <button
        className="weather__btn"
        onClick={handleChange}>
            Change to {changeTemp?'°F':'°C'}
        </button>
      </div>
    </section>
  );
};

export default WeatherCard;
