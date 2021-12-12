import React,{useState,useEffect} from 'react'

function Input({handler,value}) {
    //console.log(value)
    const [edited,setEdited] = useState(false)
     const [inputValue, setInputValue] = useState(value)


     const handleNumber=(value)=>{
         const number = parseInt(value)
         if(isNaN(number)){
           
            return 0;
        }

        return number;



     }
    //  useEffect(()=>{
    //      setInputValue(value)
    //  },[])
    return (
        <input className={`${edited?"input_edited":""}`} type="number" value={inputValue}
               onFocus={(e)=>{
                 e.target.select()

               }}
               onBlur={e=>{
                  
                   if(inputValue!==value){
                    handler(inputValue)
                    setEdited(true)

                   }

               }}
               onChange = {(e)=>{
                

                     setInputValue(()=>handleNumber(e.target.value))
                   
                

               }}
            />
    )
}

export default Input
