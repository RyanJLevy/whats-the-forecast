import React, { useContext, useEffect, useState } from 'react';
import Input from './Input';
import AddedLocations from './AddedLocations';
import { AppContext } from '../AppContext';
import SearchModal from './SearchModal'

function Main() {
    const { savedLocations } = useContext(AppContext);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ searchLocationData, setSearchLocationData ] = useState([]);

    // Handle setting modal as open.
    const openModal = () => {
        setModalOpen(true);
        console.log("MODAL OPEN");
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        console.log("SEARCH COORDS", searchLocationData);
    }, [searchLocationData]);

    return (
        <main className='relative flex flex-col items-center w-full h-full pt-10 bg-none'>
            { modalOpen && <SearchModal locationData={searchLocationData} closeModal={closeModal} /> }
            <Input openModal={ openModal } setData={ setSearchLocationData } />
            <AddedLocations />
        </main>
    )
}

export default Main