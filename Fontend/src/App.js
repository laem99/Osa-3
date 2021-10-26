import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddNew from './components/AddNew';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    let knownPerson = persons.find(person => person.name === newName);
    const personObj = {
      name: newName,
      number: newNum,
    };
    personService
      .create(personObj)
      .then(createdPerson => {
        if (knownPerson !== undefined && knownPerson.number !== newNum) {
          if (window.confirm(`${knownPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
            personService
              .update(knownPerson.id, personObj)
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== knownPerson.id ? person : returnedPerson))
              })
              .catch(error => {
                setMessage(
                  `the note '${knownPerson.name}' was already deleted from server`
                )
                setPersons(persons.filter(p => p.id !== knownPerson.id))
              })
            setTimeout(() => {
              setMessage(null)
            }, 5000);
            setMessage(`${knownPerson.name} number changed`);
          }
        }
        setPersons(persons.concat(createdPerson))
        setMessage(`${createdPerson.name} added`)
      })
      .catch(error => {
        setMessage(error.response.data.error)
      })
    setNewName('');
    setNewNum('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNum(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const removePerson = ({ person }) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))
        .catch(error => {
          setMessage(
            `the note '${person.name}' was already deleted from server`, error
          )
        })
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000);
    setMessage(`${person.name} deleted`);
  }

  const PersonsToShow = filter.length === 0
    ? persons : persons.filter(person => person.name.includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} filterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <AddNew newNum={newNum} newName={newName} add={addPerson} handleName={handleNameChange} handleNum={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={PersonsToShow} remove={removePerson} />
    </div>
  )

}

export default App