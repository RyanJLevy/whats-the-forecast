import React, { useContext } from 'react';
import Input from './Input';
import AddedLocations from './AddedLocations';
import { AppContext } from '../AppContext';

function Main() {
    const { savedLocations } = useContext(AppContext);

    return (
        <main className='relative flex flex-col items-center w-full h-full pt-10 bg-none'>
            <Input />
            <AddedLocations />
        </main>
    )
}

export default Main