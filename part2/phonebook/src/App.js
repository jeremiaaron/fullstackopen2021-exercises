import axios from 'axios'
import React, {useState, useEffect} from 'react'

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

const Person = ({name, number}) => <div>{name} {number}</div>

const Persons = ({persons}) => {
  return persons.map(person => <Person key = {person.id} name = {person.name} number = {person.number}/>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleOnSubmit = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    
    else {
      const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
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
      <Filter text = 'Filter shown with' value = {filterName} onChange = {handleFilterNameChange} />

      <h3>Add a new number</h3>
      <PersonForm
        onSubmit = {handleOnSubmit}
        nameText = 'Name:' nameValue = {newName} nameChange = {handleNameChange}
        numberText = 'Number:' numberValue = {newNumber} numberChange = {handleNumberChange}
        buttonText = 'add'
      />

      <h3>Numbers</h3>
      <Persons persons = {personsToShow} />
    </div>
  )
}

export default App;
