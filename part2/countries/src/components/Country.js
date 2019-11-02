import React from 'react'

const Country = (country, id, showDetailsClick) => {
    const listItems = country.languages.map((language, i) => <li key={i}>{language}</li>)
    if (country.showDetails) {
        if (country.weather) {
            return (
                <div key={id}>
                    <h2>{country.name}</h2>
                    <div>capital {country.capital}</div>
                    <div>population {country.population}</div>
                    <h3>languages</h3>
                    <ul>
                        {listItems}
                    </ul>
                    <img alt="flag" src={country.flag} />
                    <h3>Weather in {country.capital}</h3>
                    <div><h4 className='inlined'>temperature: </h4>{country.weather.temperature}</div>
                    <div><img alt='weather icon' src={country.weather.weatherIcon} /></div>
                    <h4 className='inlined'>wind: </h4>{country.weather.wind}
                </div>
            )
        } else {
            return (
                <div key={id}>
                    <h2>{country.name}</h2>
                    <div>capital {country.capital}</div>
                    <div>population {country.population}</div>
                    <h3>languages</h3>
                    <ul>
                        {listItems}
                    </ul>
                    <img alt="flag" src={country.flag} />
                </div>
            )
        }
    } else {
        return (
            <div key={id}>
                {country.name}
                <button onClick={() => showDetailsClick(id)}>show</button>
            </div>
        )
    }
}

export default Country