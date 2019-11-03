import React from 'react'

const Person = (person, handlePersonDelete) => {
    return (
        <div key={person.id}>{person.name} {person.number} <button onClick={() => handlePersonDelete(person)}>delete</button></div>
    )
}

export default Person