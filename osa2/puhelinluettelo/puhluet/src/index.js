import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'
import Message from './components/message'
import Error from './components/error'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll] = useState(false)
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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
      if (window.confirm(`Update number for ${newName}?`)) {
        const per = persons.find(per => per.name === newName)
        personsService
          .update(per.id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== per.id ? person : response))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(null)
            setError(
              `${newName} has already been removed from server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
        //alert(`${newName} is already added to phonebook`)
      }
    } else {
      personsService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
        
        .catch(error => {
          setMessage(null)
          setError(
            'Name minimum length 3 and number minimum length 8')
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
      setMessage(
        `${newName} added.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setMessage(null)
          setError(
            `${person.name} has already been removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
      setMessage(
        `${person.name} removed succesfully.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={error} />
      <Message message={message} />
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={add}>
        <PersonForm newName={newName} handleNameChange={handleNameChange}
          newNumber={newNumber} handleNumberChange={handleNumberChange} />
      </form>
      <h2>Numbers</h2>
      <MapPersons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

const MapPersons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) =>
        <Person key={person.name} person={person} removePerson={() => props.removePerson(person)} />
      )}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={removePerson} >delete</button>
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