import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import PersonService from '../services/PersonService'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState({ message: null, class: null })

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handlePersonDelete = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            PersonService
                .remove(person.id)
                .then(() => setPersons(persons.filter(p => p.id !== person.id)))
        }
    }

    const addPerson = (event) => {
        event.preventDefault()

        // look for dupes
        if (persons.filter(p => p.name === newName && p.number === newNumber).length > 0) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const existingPerson = persons.find(p => p.name === newName)

        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                PersonService
                    .update({ ...existingPerson, number: newNumber })
                    .then(updatedPerson => {
                        setNotification({
                            message: `Updated ${updatedPerson.name}`,
                            class: 'notification'
                        })
                        setTimeout(() => {
                            setNotification({
                                message: null, class: null
                            })
                        }, 5000)
                        setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        setNotification({
                            message: `Information of ${existingPerson.name} has already been removed from server`, class: 'error'
                        })
                        setTimeout(() => {
                            setNotification({ message: null, class: null })
                        }, 5000)
                    })
                return
            }
            return
        }

        const personObject = {
            id: null,
            name: newName,
            number: newNumber
        }

        PersonService
            .create(personObject)
            .then(returnedPerson => {
                setNotification({
                    message: `Added ${returnedPerson.name}`,
                    class: 'notification'
                })
                setTimeout(() => {
                    setNotification({
                        message: null,
                        class: null
                    })
                }, 5000)
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                console.log(error.response.data)
                setNotification({
                    message: error.response.data.error,
                    class: 'error'
                })
                setTimeout(() => {
                    setNotification({
                        message: null,
                        class: null
                    })
                }, 5000)
              })
    }

    useEffect(() => {
        PersonService.getAll().then((initialPersons) => {
            setPersons(initialPersons)
        })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification className={notification.class} message={notification.message} />

            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} handlePersonDelete={handlePersonDelete} />
        </div>
    )
}

export default App