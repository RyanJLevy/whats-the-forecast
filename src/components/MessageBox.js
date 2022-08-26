import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Button from "./Button";

function MessageBox({ title, innerText }) {
    const [ closed, setClosed ] = useState(false);
    return (!closed && 
            <div className="w-[400px] lg:w-[800px] rounded-md bg-[#65E5ED] bg-opacity-40 border-2 border-[#009BA5] relative p-4 mb-8">
                <Button className='hover:bg-[#009aa588] absolute right-3 top-3 rounded-sm' iconClass='w-[18px] h-[18px] text-[#009BA5] hover:text-white' Icon={XIcon} title='Close alert message.' onClick={() => {setClosed(true)}} />
                <h1 className="text-[#009BA5] font-semibold text-lg">{title}</h1>
                <p className="text-[#009BA5] font-regular">{innerText}</p>
            </div>
        )
    
}

export default MessageBox