import React, { Fragment } from "react";

const SingleCountry = ({ country }) => {
  console.log(country);

  const mapLang = country.languages.map((lang) => <li>{lang.name}</li>);

  return (
    <Fragment>
      <h2>{country.name}</h2>
      <p>Capitol: {country.capital}</p>
      <p>Population: {Number(country.population).toLocaleString()}</p>
      <h3>Languages</h3>
      <ul>{mapLang}</ul>
      <img style={{ width: "300px" }} src={country.flag} />
    </Fragment>
  );
};

export default SingleCountry;
