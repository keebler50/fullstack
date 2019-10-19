import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {

    const rows = persons
        .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        .map((person) => Person(person))

    return (
        <>
            {rows}
        </>
    )
}

export default Persons