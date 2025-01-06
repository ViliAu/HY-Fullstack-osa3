import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import personsService from './services/persons';
import Message from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('')
  const [messageData, setMessageData] = useState({show: false, error: false, message: ''});

  // Init persons list
  useEffect(() => {
    const getPersons = async () => {
      setPersons(await personsService.getAll());
    }
    getPersons();
  }, [])

  const showMessage = async (error, message) => {
    setMessageData({show: true, error, message});
    setTimeout(() => {
      setMessageData({show: false, error, message});
    }, 2000);
  }

  return (
    <div>
      <Message data={messageData}/>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm persons={persons} setPersons={setPersons} showMessage={showMessage} />
      <PersonList persons={persons} filter={filter} setPersons={setPersons} showMessage={showMessage} />
    </div>
  )

}

export default App