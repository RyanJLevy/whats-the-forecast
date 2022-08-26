import React, { useEffect, useRef, useState } from 'react'
import {XCircleIcon, LocationMarkerIcon} from '@heroicons/react/outline'
import Button from './Button'
import { GetPossibleLocations } from '../helpers/api.helpers';

function Input({ openModal, setData }) {
    const inputRef = useRef('');
    const [currentSearch, setCurrentSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Clear search bar.
    const HandleSubmit = (event) => {
        event.preventDefault();
        inputRef.current.value = '';
        setCurrentSearch('');
        setSearchResults([]);
    }

    // Filters search of locations given search string.
    // @param {string} search string.
    // @return {none} sets current search result.
    const filterSearch = async (searchTerm) => {
        const results = await GetPossibleLocations(searchTerm);
        setSearchResults(results);
    }

    // Handles selection of search result. Sets modal open state and search coordinates.
    const HandleSearchItemSelection = ( coordinates, state ) => {
        openModal();
        setData([ coordinates.lat, coordinates.lon, state ]);
        inputRef.current.value = '';
        setCurrentSearch('');
        setSearchResults([]);
    }

    useEffect(() => {
        if (currentSearch) {
            filterSearch(currentSearch);
        }
        else {
            setSearchResults([]);
        }
    }, [currentSearch]);

    const HandleKeyUp = (event) => {
        setCurrentSearch(event.target.value);
    }

    return (
            <div>
                <form className='relative z-50' onSubmit={HandleSubmit} spellCheck={'false'}>
                    <div className='w-[320px] lg:w-[500px] relative'>
                        <input
                        type={'text'}
                        className='bg-none border-purple-secondary border-[1px] rounded-md focus:outline-none w-full px-6 py-2 placeholder:text-gray-secondary text-purple-secondary'
                        placeholder='Ex: San Diego, CA'
                        ref={inputRef}
                        onKeyUp={HandleKeyUp}
                        >
                        </input>
                        <Button iconClass='absolute right-6 top-3 w-[18px] h-[18px] text-purple-primary' Icon={XCircleIcon} title='Clear search text' onClick={HandleSubmit}/>
                        {searchResults && (
                            <ul className='absolute w-full bg-white shadow-md rounded-md z-50'>
                                {searchResults.map(location => (
                                    <li 
                                    key={location.id} 
                                    className='w-full flex items-center justify-center py-4 hover:bg-gray-50 cursor-pointer'
                                    onClick={ () => HandleSearchItemSelection(location.coord, location.state) }
                                    tabIndex={0}
                                    >
                                        <LocationMarkerIcon className='w-6 text-purple-primary px-1' />
                                        <h1 className='text-purple-primary'>{location.name}, {location.state}</h1>
                                    </li>
                                    
                                ))}

                            </ul>
                        )}
                    </div>
                </form>
            </div>
    )
}

export default Input