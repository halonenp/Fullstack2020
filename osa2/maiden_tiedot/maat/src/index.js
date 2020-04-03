
import ReactDOM from 'react-dom';
import axios from 'axios'
import React, { useState, useEffect } from 'react'


const Countries = (props) => {
  let countriesToShow = props.countries
  if (props.searchCountry !== '') {
    countriesToShow = props.countries.filter(country => country.name.toLowerCase().includes(props.searchCountry.toLowerCase()))
  }

  if (countriesToShow.length > 10 && props.searchCountry === '') {
    return (
      <Filter searchCountry={props.searchCountry} handleFilterChange={props.handleFilterChange} />
    )
  }

  else if (countriesToShow.length > 10 && props.searchCountry !== '') {
    return (
      <div>
        <Filter searchCountry={props.searchCountry} handleFilterChange={props.handleFilterChange} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if (countriesToShow.length === 1 && props.searchCountry !== '') {
    return (
      <div>
        {countriesToShow.map((country, i) =>
          <Country key={i} country={country} setSearchCountry={props.setSearchCountry}

            searchCountry={props.searchCountry} handleFilterChange={props.handleFilterChange}
            number='1' />
        )}
      </div>
    )
  }
  return (
    <div>
      <Filter searchCountry={props.searchCountry} handleFilterChange={props.handleFilterChange}
        setSearchCountry={props.setSearchCountry} />

      {countriesToShow.map((country, i) =>
        <Country key={i} country={country}
          setSearchCountry={props.setSearchCountry}
          number='0' />
      )}
    </div>
  )

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  //const [showAll, setShowAll] = useState('')


  useEffect(() => {
    console.log('kak')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setSearchCountry(event.target.value)
  }

  const handleClick = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>

      <Countries countries={countries}
        handleFilterChange={handleFilterChange} searchCountry={searchCountry}
        setSearchCountry={setSearchCountry} handleClick={handleClick} />

    </div>
  )
}
const Filter = (props) => {


  return (
    <div>find countries
      <input
        value={props.searchCountry}
        onChange={props.handleFilterChange} />
    </div>
  )
}
const Languages = (props) => {
  return (
    props.languages.map(language => <li key={language.nativeName}>{language.name}</li>)
  )
}

const Country = (props) => {
  if (props.number === '1') {
    return (

      <div>
        <h2>{props.country.name}</h2>
       capital {props.country.capital}
        <br />
        population {props.country.population}
        <br />
        <h3>
          Spoken Languages
        </h3>
        <Languages languages={props.country.languages} />
        <p>
          <img style={{ width: '100%', high: '100%' }} src={props.country.flag} alt="Flag" />
        </p>

      </div>
    )
  }

  return (
    <li>{props.country.name}
      <button type="button" onClick={() => props.setSearchCountry(props.country.name)}>
        show
      </button>
    </li>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
