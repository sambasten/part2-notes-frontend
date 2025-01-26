import Person from "./Person"

const Phonebook = ({persons, onDelete}) => { 
    return (
    <ul>
    {persons.map( person => 
      <Person key={person.id} name= {person.name} number={person.number} onDel={() => onDelete(person.id)}/>
      )}
    </ul>
    )
}

export default Phonebook