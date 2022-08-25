import React from 'react'
import LocationWidget from './LocationWidget'

function SearchResults({ locations }) {
    return (
        <div className='flex w-full'> 
            <div className='flex flex-col w-full items-center mt-8'>
                {locations && locations.map(location => (
                    <LocationWidget key={location.id} data={location} />
                ))}
            </div>
        </div>

    )
}

export default SearchResults