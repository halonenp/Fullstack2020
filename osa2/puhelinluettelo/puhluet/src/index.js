import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Hel', number: '39-44-5323523' },
  { name: 'Dan', number: '12-43-234345' },
  { name: 'gay', number: '39-23-6423122' },
  { name: 'kak', number: '69' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll] = useState(false)
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

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
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

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
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}
const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
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