import React,{useState} from 'react'

function Input({handler,value}) {
    const [edited,setEdited] = useState(false)
     const [inputValue, setInputValue] = useState(value)
    return (
        <input className={`${edited?"input_edited":""}`} type="text" value={value}
               onFocus={(e)=>{
                 e.target.select()

               }}
               onChange = {(e)=>{
                let value = parseInt(e.target.value)
                if(isNaN(value)){
                    e.target.value=0; 
                    return;
                }
                if(inputValue!==value){
                    e.target.value =  value;
                     setInputValue(value)
                    handler(value)
                    setEdited(true)
                }
                

               }}
            />
    )
}

export default Input
