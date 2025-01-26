import { useEffect, useState } from 'react'
import Phonebook from './components/Phonebook'
import PhoneForm from './components/PhoneForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const personObj = {
    name: newName,
    number: newNum,
    id: persons.length + 1
  }
  
  useEffect(() => {
    // const promise = axios.get('http://localhost:3001/persons')
    // //console.log('axios promise', promise)
    // promise.then(response => {
    //   //console.log('resp', response.data)
    //   setPersons(response.data)
    // })
    personService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])
  
  const handleFiltering = (e) => {
    const filterVal = e.target.value
    setFilterName(filterVal)
  }
  
  const addPerson = (e) => {
    e.preventDefault();
    const found = persons.some( person => person.name == personObj.name )
      if  ( !found ) {
        // const promise = axios.post(`http://localhost:3001/persons`, personObj)
        personService.add(personObj).then(response => {
          console.log('add person response', response.data)
          setPersons(persons.concat(response.data));
          setNewName('')
          setNewNum('')
      })
    }else {
      //alert (`The name ${ newName } already exists in phonebook`)
      if (window.confirm(`${personObj.name} is already added to phonebook,replace the old number with a new one ?`)) {
        const thePerson = persons.find(p => p.name === personObj.name)
        console.log('the person', thePerson)
        //person obj will now contain original name and id and a diff number
        const updatedPerson = {...personObj, number: newNum, id: thePerson.id }
        console.log('spread ope', updatedPerson)
        personService.update(thePerson.id, updatedPerson).then((response) => {
          console.log('update resp',response.data)
          const old = persons.filter(p => p.id !== updatedPerson.id)
          const updatedPersons = old.concat([response.data])
          console.log('updatedPersons',updatedPersons)
          setPersons(updatedPersons)
        })
      }
    }
  }
  
  const filteredPersons = filterName ?
  persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) :
  persons
  
  const handleDel = (id) => {
    const person = persons.find(p => p.id === id)
    // console.log(person)
    const updatedPersons = persons.filter(p => p.id !== id)
    
    if (window.confirm(`Are you sure you want to delete ${person.name} ??`)) {
      personService.del(id, person).then((response) => {
      console.log('delete resp', response.data)
      setPersons(updatedPersons)
    })
    }
  }
  

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
        onDelete={handleDel}
      />
    </div>
  )
}

export default App

