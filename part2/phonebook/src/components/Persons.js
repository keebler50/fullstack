import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, handlePersonDelete }) => {
    const rows = persons
        .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        .map((person) => Person(person, handlePersonDelete))

    return (
        <>
            {rows}
        </>
    )
}

export default Persons