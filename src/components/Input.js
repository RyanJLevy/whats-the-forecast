import React from 'react'
import {SearchIcon} from '@heroicons/react/outline'
import Button from './Button'

function Input(props) {
    return (
        <div className='w-[320px] lg:w-[500px] relative'>
            <input
             type={'text'}
             className='bg-none border-purple-secondary border-[1px] rounded-md focus:outline-none w-full px-6 py-2 placeholder:text-gray-secondary'
             placeholder='Ex: San Diego, CA'
             ref={props.data.ref}
             >
            </input>
            <Button iconClass='absolute right-6 top-3 w-[18px] h-[18px] text-purple-primary' Icon={SearchIcon} title='Search' onClick={props.data.onButtonClick}/>
        </div>
    )
}

export default Input