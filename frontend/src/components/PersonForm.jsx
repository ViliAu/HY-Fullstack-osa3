import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, showMessage}) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  const submitform = async (event) => {
    event.preventDefault();
    const newPerson = {name: newName, number: newNumber};
    const existingPerson = persons.filter(p => p.name === newName)[0];
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the number with a new one?`)) {
        try {
          const data = await personService.updatePerson(existingPerson.id, newPerson);
          setPersons(persons.map(p => p.name === existingPerson.name ? data : p));
          showMessage(false, `Updated ${data.name}`);
        }
        catch(e) {
          showMessage(true, `Unable to update ${newName}`);
          setPersons(await personService.getAll());
        }
      }
    }
    else {
      const data = await personService.addPerson(newPerson);
      setPersons(persons.concat(data));
      showMessage(false, `Added ${data.name}`);
    }
  }

    return (
        <>
            <h2>add new</h2>
            <form onSubmit={submitform}>
                <div>
                name: <input value={newName} onChange={handleNameInput}/>
                </div>
                <div>number: <input value={newNumber} onChange={handleNumberInput}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm;