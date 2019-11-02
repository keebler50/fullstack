import React from 'react'
import Country from './Country'

const Countries = ({countries, showDetailsClick}) => {
    return (
        <>
            {countries.map((country, i) => Country(country, i, showDetailsClick))}
        </>
    )
}

export default Countries