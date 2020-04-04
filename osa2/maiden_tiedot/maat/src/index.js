import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    console.log('okke')
  }

  const handleClick = (event) => {
    setSearch(event.target.id)
    console.log('jaha')
  }

  const countriesToShow = countries.filter(country =>
    (country.name.toLowerCase().includes(search.toLowerCase())))
  return (
    <div>
      <div>
        {<Filter search={search}
          handleSearchChange={handleSearchChange} />}
      </div>
      <div>
        {<Countries countriesToShow={countriesToShow}
          handleClick={handleClick} />}
      </div>
    </div>
  )
}

const Country = ({ country, handleClick }) => {
  return (
    <div>
      <li>{country.name}<Button onClick={handleClick} id={country.name} /></li>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        Capital: {country.capital}
      </div>
      <div>
        Population: {country.population}
      </div>
      <h3>languages</h3>
      {country.languages.map(language =>
        <li key={language.name}>{language.name}</li>)}
      <img src={country.flag} alt='flag' height="20%" width="20%" />
    </div>
  )
}

const Countries = ({ countriesToShow, handleClick }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify
      </div>
    )
  } if (countriesToShow.length === 0) {
    return (
      <div>
        No countries to show
      </div>
    )
  }
  if (countriesToShow.length === 1) {
    return (
      countriesToShow.map(country =>
        <CountryInfo key={country.name} country={country} />)
    )
  } else {
    return (
      countriesToShow.map(country =>
        <Country key={country.name} country={country} handleClick={handleClick} />)
    )
  }
}

const Filter = ({ handleSearchChange, search }) => {
  return (
    <form onSubmit={handleSearchChange}>
      find countries:
      <input value={search} onChange={handleSearchChange} />
    </form>
  )
}

const Button = ({ onClick, id }) => {
  return (
    <button onClick={onClick} id={id}>show</button>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
