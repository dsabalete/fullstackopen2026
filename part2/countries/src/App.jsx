import { useState, useEffect } from "react";
import countryService from "./services/countries.js";

import Weather from "./components/Weather.jsx";

function App() {
  const [newFilter, setNewFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((data) => {
      console.log(data);
      setAllCountries(data);
    });
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setNewFilter(value);
    setCountries(
      allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <div className="countries-app">
      <h1>Countries App</h1>

      <p>
        find countries{" "}
        <input type="text" value={newFilter} onChange={handleFilterChange} />
      </p>

      <div>
        {countries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {countries.length <= 10 &&
          countries.length > 1 &&
          countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setCountries([country])}>show</button>
            </div>
          ))}

        {countries.length === 1 && (
          <div>
            <h2>{countries[0].name.common}</h2>
            <p>Capital: {countries[0].capital}</p>
            <p>
              Area: {countries[0].area} km<sup>2</sup>
            </p>
            <p>Population: {countries[0].population}</p>
            <img
              src={countries[0].flags.png}
              alt={`Flag of ${countries[0].name.common}`}
              width="150"
            />
            <p>Languages: {Object.values(countries[0].languages).join(", ")}</p>

            <div>
              <h3>Weather in {countries[0].capital}</h3>
              <Weather location={countries[0].capital} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
