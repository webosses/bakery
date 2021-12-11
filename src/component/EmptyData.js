import React from 'react'
import { useGlobalContext } from '../context';
import CopyButton from './CopyButton';

function EmptyData() {
    const {selectedDay,yesterday} = useGlobalContext();

    return <>
        <div className="empty notice">
           <h1>Data isn't available...</h1> 
           {selectedDay!=yesterday&&<CopyButton title="Generate Data"/>}

        </div>



        
        

    </>
}

export default EmptyData
