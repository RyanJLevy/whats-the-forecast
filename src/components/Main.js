import React, { useEffect, useState } from 'react';
import Input from './Input';
import AddedLocations from './AddedLocations';
import SearchModal from './SearchModal'
import MessageBox from './MessageBox';

function Main() {
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
            <MessageBox title={'Hello!'} innerText={'Welcome to WTF! Simply type a location into the search bar to get started. Click the cancel button or press ENTER to clear your search.'} />
            { modalOpen && <SearchModal locationData={searchLocationData} closeModal={closeModal} /> }
            <Input openModal={ openModal } setData={ setSearchLocationData } />
            <AddedLocations />
        </main>
    )
}

export default Main