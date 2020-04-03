import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll] = useState(false)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const add = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === nameObject.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {

      personsService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
/*  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(person.id)
        .then((returnedNote) => {
          setPersons(persons.map(note => note.id !== id ? note : returnedNote))
        })
    }
  }*/


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={add}>
        <PersonForm newName={newName} handleNameChange={handleNameChange}
          newNumber={newNumber} handleNumberChange={handleNumberChange} />
      </form>
      <h2>Numbers</h2>
      <MapPersons personsToShow={personsToShow} />
    </div>
  )
}
const MapPersons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) =>
        <Person key={person.name} person={person} removePerson={removePerson} />
      )}
    </div>
  )
}
const removePerson = (person) => {
  if (window.confirm(`Delete ${person.name} ?`)) {
  personsService
    .remove(person.id)
      .catch(error => {
        alert(
          (`${person.name} has already been removed`)
        )
    })
  }
}

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => removePerson(person) } >delete</button>
    </p>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </div>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'))