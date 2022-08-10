import React, { useRef, useState } from 'react';
import Input from './Input';
import { GetPossibleLocations, GetWeatherData } from '../helpers/api.helpers'; 
import SearchResults from './SearchResults';
import AddedLocations from './AddedLocations';

function Main() {
    const searchRef = useRef(null);
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [addedLocations, setAddedLocations] = useState(null);

    const handleButtonClick = async (event) => {
        const currentInputValue = searchRef.current.value;
        const locationRawData = await GetPossibleLocations(currentInputValue);
        let locations = [];
        for (const location of locationRawData) {
            const locationData = await GetWeatherData(location.coord.lat, location.coord.lon, location.state);
            console.log(locationData)
            locations.push(locationData);
        }
        setSearchedLocation(locations);
    }

    return (
        <main className='flex flex-col items-center w-full py-10 bg-none'>
            <Input data={{ref: searchRef, onButtonClick: handleButtonClick}}/>
            {searchedLocation ? <SearchResults locations={searchedLocation} /> : <AddedLocations />}
        </main>
    )
}

export default Main