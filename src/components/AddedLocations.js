import React, { useState } from 'react'
import { useEffect } from 'react'
import { GetWeatherDataFromStorage } from '../helpers/localStorage.helpers';
import LocationWidget from './LocationWidget';

function AddedLocations() {
    const [savedLocations, setSavedLocations] = useState([]);
    // TODO: Display saved locations; accessed in LS.
    useEffect(() => {
        const getLocationData = async () => {
            const locationData = await GetWeatherDataFromStorage();
            setSavedLocations(locationData);
        }
        getLocationData();
    }, []);
    return (
        <div className='flex flex-col w-[400px] lg:w-[800px] items-center my-8 pb-4 bg-gray-100 rounded-md'>
            {savedLocations.length ? savedLocations.map(location => (
                <LocationWidget key={location.id} data={location} isSaved={true} />
            )) : <h1 className='p-6 italic '>No saved locations.</h1>}
        </div>
    )
}

export default AddedLocations