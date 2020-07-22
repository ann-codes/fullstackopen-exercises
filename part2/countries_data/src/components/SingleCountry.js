import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const API_PATH = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`;

  const mapLang = country.languages.map((lang, i) => (
    <li key={i}>{lang.name}</li>
  ));

  const fetchCountries = () => {
    axios.get(API_PATH).then((response) => {
      setWeather(response.data.current);
    });
  };

  useEffect(fetchCountries, []);

  const showWeather = () => {
    // check for undefined due to api call delay; calling undefined object will break app
    if (weather) {
      return (
        <Fragment>
          <p>Temperature: {weather.temperature} Celcius</p>
          <p>
            Wind: {weather.wind_speed}, {weather.wind_dir} direction
          </p>
          {weather.weather_icons ? (
            <img
              src={weather.weather_icons}
              alt={country.capital + " weather"}
            />
          ) : (
            <p>Loading Image...</p>
          )}
        </Fragment>
      );
    } else {
      return <p>Loading Weather....</p>;
    }
  };

  return (
    <Fragment>
      <h2>{country.name}</h2>
      <p>Capitol: {country.capital}</p>
      <p>Population: {Number(country.population).toLocaleString()}</p>
      <h3>Weather in {country.capital}</h3>
      {showWeather()}
      <h3>Languages</h3>
      <ul>{mapLang}</ul>
      <img
        style={{ width: "300px", marginTop: "1rem" }}
        alt={country.capital + " flag"}
        src={country.flag}
      />
    </Fragment>
  );
};

export default SingleCountry;
