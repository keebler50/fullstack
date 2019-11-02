import React from 'react'

const Filter = ({handleFilterChange}) => {

    return (
        <div>find countries <input id='inputFilter'
            onChange={handleFilterChange} /></div>
    )
}

export default Filter