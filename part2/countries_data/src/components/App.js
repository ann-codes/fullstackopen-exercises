import React, { useEffect, useState } from "react";
import SingleCountry from "./SingleCountry";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCountries, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const showClick = e => {
    setFilter(e.target.name)
  }

  const filterCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const countryDisplay = () => {
    if (filterCountries.length > 10) {
      return <li>Too many countries found, please be more specific.</li>;
    } else if (filterCountries.length === 1) {
      return <SingleCountry country={filterCountries[0]} />;
    } else {
      return filterCountries.map((country) => (
        <li key={country.alpha3Code}>
          {country.name} <button name={country.name} onClick={showClick}>Show</button>
        </li>
      ));
    }
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <span>Find Country: </span>
      <input name="name" value={filter} onChange={handleFilter} />
      <ul>{countryDisplay()}</ul>
    </div>
  );
};

export default App;
