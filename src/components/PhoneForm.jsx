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
  
  export default PhoneForm