import React from 'react'

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const Header = ({ name }) => {
    return (
        <h3>{name}</h3>
    )
}

const Content = ({ parts }) => {
    const allparts = parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)

    return (
        <>
            {allparts}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((a, b) => a + b.exercises, 0)
    return (
        <h4>total of {total} exercises</h4>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <p>{part} {exercises}</p>
    )
}

export default Course