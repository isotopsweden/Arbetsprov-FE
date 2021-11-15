import axios from "axios";
import React, { useState } from "react";
import Union from "./../icons/Union.svg";
import ICityData from "../interfaces/ICityData";
import WeatherCards from "./WeatherCards";


function CityInput() {
  const [cityDataList, setCityDataList] = useState<ICityData[]>([]);
  const [city, setCity] = useState("");
  const [showWeather, setShowWeather] = useState(false);
  const [error, setError] = useState(false);

  function deleteWeatherCard (deletedWeatherData: ICityData) {
    setCityDataList (cityDataList.filter(function(city) {
      return city !== deletedWeatherData
    }))
  }

  function searchWeather() {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=64e4e6ca972207fa0ace4de48da6f763&query=${city}`
      )
      .then((response) => {
        if (response.data.success === false) {
          setError(true);
        } else {
          setError(false);
          setCityDataList([...cityDataList, response.data]);
          setShowWeather(true);
        }
      });
  }
 
  return (
    <>
      <div className="input-wrapper">
        <h1 className="input-statement">Hur är vädret i ...</h1>
        <div className="input-container">
          <span>Plats: </span>
          <input
            name="city"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          ></input>
          <button onClick={searchWeather}>
            <img src={Union} alt="" />
          </button>
        </div>
        {!error ? (
          <p> </p>
        ) : (
          <p>Det finns ingen stad som matchar din sökning</p>
        )}
      </div>

      <div className="weather-card-container">
        {!showWeather ? (
          <p> </p>
        ) : (
          cityDataList.map((city) => {
            console.log(cityDataList)
            return <WeatherCards weatherData={city} handleDeleteWeatherCard={deleteWeatherCard}/>;
          })
        )}
      </div>
    </>
  );
}

export default CityInput;
