const Person = (props) => {
    const { name, number, onDel} = props
    return (
      <div>
        <li>{name} --- {number} <button onClick={onDel}>DELETE</button></li>
      </div>
    )
  }
  
export default Person