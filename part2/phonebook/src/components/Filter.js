import React from 'react'

const Filter = ({filter, handleFilterChange}) => {

    return (
        <div>filter shown with <input
            filter={filter} 
            onChange={handleFilterChange} /></div>
    )
}

export default Filter