import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  
  useEffect(() => {
    const promise = axios.get('http://localhost:3001/persons')
    console.log('axios promise', promise)
    promise.then(response => {
      console.log('resp', response.data)
      setPersons(response.data)
    })
    
  }, [])
  
  const handleFiltering = (e) => {
    const filterVal = e.target.value
    setFilterName(filterVal)
  }
  
  const addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNum,
      id: persons.length + 1
    }
    const found = persons.some( person => person.name == personObj.name )
    if  ( !found ) {
     setPersons(persons.concat(personObj));
     setNewName('')
     setNewNum('')
    } else { alert (`The name ${ newName } already exists in phonebook`)}
  }
  
  const filteredPersons = filterName ?
  persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) :
  persons
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      filter shown with: <input
      value={filterName}
      onChange={handleFiltering}
      />
      </div>
      <PhoneForm 
        onsubmit={addPerson}
        nameval={newName}
        namechange={e => setNewName(e.target.value)}
        numval={newNum}
        numchange={e => setNewNum(e.target.value)}
        
      />
      <h2>Numbers</h2>
      <Phonebook
        persons={filteredPersons}
      />
    </div>
  )
}

export default App

const PhoneForm = (props) => {
  const {onsubmit, nameval, namechange, numval, numchange } = props

  return (
    <form onSubmit={onsubmit}>
    <div>
      name: <input 
      value={nameval}
      onChange={namechange}
      />
    </div>
    <div>
      number: <input 
      value={numval}
      onChange={numchange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Phonebook = ({persons}) => {
    return (
    <ul>
    {persons.map( person => 
      <Persons key={person.id} name= {person.name} number={person.number}/>
      )}
    </ul>
    )
}

const Persons = (props) => {
  const { name, number, isFiltered } = props
  return (
    <li>{name} --- {number} </li>
  )
}
