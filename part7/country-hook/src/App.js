import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return { type, value, onChange };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const fetch = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then((res) => {
        setCountry(res);
      })
      .catch((ex) => {
        console.log("EXCEPTION:", ex);
      });
  };
  useEffect(fetch, [name]);
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }
  // had to edit existing code to make it work w/ DS??
  if (country.status !== 200) {
    return <div>not found...</div>;
  }

  country.data = country.data[0];

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
