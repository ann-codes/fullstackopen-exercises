import React, { useEffect, useState } from "react";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCountries, []);

  return <div>Hello World</div>;
};

export default App;
