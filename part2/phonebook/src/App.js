import React, {useState, useEffect} from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({text, value, onChange}) => {
  return <div>{text} <input value = {value} onChange = {onChange} /></div>
}

const PersonForm = (props) => {
  return (
    <form onSubmit = {props.onSubmit}>
        <div>
          {props.nameText} <input value = {props.nameValue} onChange = {props.nameChange}/>
        </div>
        <div>
          {props.numberText} <input value = {props.numberValue} onChange = {props.numberChange} />
        </div>
        <button type = 'submit'>{props.buttonText}</button>
    </form>
  )
}

const Person = ({name, number, id, deletePerson}) => {
  return (
    <div>
      {name} {number} <button onClick = {() => deletePerson(id, name)}>delete</button>
    </div>
  )
}

const Persons = ({persons, deletePerson}) => {
  return persons.map(person =>
    <Person
      key = {person.id}
      name = {person.name}
      number = {person.number}
      id = {person.id}
      deletePerson = {deletePerson}
    />)
}

const AddedNotification = ({message}) => {
  if(message === null) return null
  
  return (
    <div className='added'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if(message === null) return null
  
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleOnSubmit = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      const samePerson = persons.find(person => person.name === newName)

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: samePerson.id
        }

        personService
          .update(samePerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === samePerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setAdded(true)
            setMessage(`Added ${newName}`)
            setTimeout(() => {
              setMessage(null)
              setAdded(false)
            }, 5000)
          })
          .catch(error => {
            setError(true)
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
              setError(false)
            }, 5000)
            setPersons(persons.filter(person => person.name !== newName))
          })
      }
    }
    
    else {
      const newObject = {
        name: newName,
        number: newNumber,
        id: newName
      }
      personService
        .create(newObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setAdded(true)
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
            setAdded(false)
          }, 5000)
        })
    }
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .deleteObject(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      {added && <AddedNotification message = {message} />}
      {error && <ErrorNotification message = {message} />}

      <Filter text = 'Filter shown with' value = {filterName} onChange = {handleFilterNameChange} />

      <h3>Add a new number</h3>
      <PersonForm
        onSubmit = {handleOnSubmit}
        nameText = 'Name:' nameValue = {newName} nameChange = {handleNameChange}
        numberText = 'Number:' numberValue = {newNumber} numberChange = {handleNumberChange}
        buttonText = 'add'
      />

      <h3>Numbers</h3>
      <Persons persons = {personsToShow} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App
