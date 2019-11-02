import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
    const [filtered, setFiltered] = useState([])
    const [countries, setCountries] = useState([]);
    const handleFilterChange = (event) => {
        const filteredCountries = countries.filter(c => c.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
        if (filteredCountries.length === 1) {
            axios
                .get('http://api.weatherstack.com/current?access_key=fc6aa3078c606c6f4721b2a55ea66fe2&query=' + filteredCountries[0].capital)
                .then(response => {
                    setFiltered(filteredCountries.map(d => {
                        let c = {}
                        c.name = d.name
                        c.capital = d.capital
                        c.population = d.population
                        c.languages = d.languages
                        c.flag = d.flag
                        c.showDetails = filteredCountries.length === 1
                        c.weather = {}
                        c.weather.temperature = response.data.current.temperature + ' Celsius'
                        c.weather.weatherIcon = response.data.current.weather_icons[0]
                        c.weather.wind = response.data.current.wind_speed + ' kph direction ' + response.data.current.wind_dir
                        return c;
                    }))
                })
        } else {
            setFiltered(filteredCountries.map(d => {
                let c = {}
                c.name = d.name
                c.capital = d.capital
                c.population = d.population
                c.languages = d.languages
                c.flag = d.flag
                c.showDetails = false
                c.weather = null
                return c;
            }))
        }
    }
    const handleShowDetailsClick = (id) => {
        filtered[id].showDetails = true;
        setFiltered([...filtered])
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                let countries = response.data.map(d => {
                    let c = {}
                    c.name = d.name
                    c.capital = d.capital
                    c.population = d.population
                    c.languages = d.languages.map(l => l.name)
                    c.flag = d.flag
                    c.showDetails = false
                    c.weather = null
                    return c;
                })
                setCountries(countries)
                setFiltered(countries.map(d => {
                    let c = {}
                    c.name = d.name
                    c.capital = d.capital
                    c.population = d.population
                    c.languages = d.languages
                    c.flag = d.flag
                    c.showDetails = false
                    c.weather = null
                    return c;
                }))
            })
    }, [])

    if (filtered.length > 10) {
        return (
            <>
                <Filter handleFilterChange={handleFilterChange} />
                <div>Too many matches, specify another filter</div>
            </>
        )
    } else if (filtered.length >= 1) {
        return (
            <>
                <Filter handleFilterChange={handleFilterChange} />
                <Countries countries={filtered} showDetailsClick={handleShowDetailsClick} />
            </>
        )
    } else {
        return (
            <>
                <Filter handleFilterChange={handleFilterChange} />
                <div>No matches, specify another filter</div>
            </>
        )
    }
}

export default App