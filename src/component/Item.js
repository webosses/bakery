import React,{useState} from 'react';
import {useGlobalContext} from '../context';
import Actions from './Actions';
import Switcher from './Switcher';
import Input from './Input';
// import Calendar from 'react-calendar';



//actions {hasAction bool, markup func }
export default function Item({item,printHeader}){
  const {categories,handleUpdate,viewor,selectedDay,today,yesterday,tomorrow} =  useGlobalContext();
  // const [instock,setInstock] = useState(item.instock)
  // const [iswrap,setIswrap] = useState(item.iswrap)
  // const [required,setRequired] = useState(item.required)
  // const [showBtns,setShowBtns] = useState(false)
  const [isDone,setIsDone] = useState(item.isDone)
  // const [unstickTray,setUnstickTray] = useState(item.unstickTray)


  const [edited,setEdited] = useState(false)
  const [inputValue, setInputValue] = useState(item.required)

   const setRequiredNumber = (value)=>{
     return handleUpdate(item.id,'required',value)
   }
  

  
    return<>
     {printHeader&&<tr className="item_category_title"><th colSpan="5">{item.category}</th></tr>}
      <tr className={`item ${item.instock?"instock":'outstock'}`}>
          <td className="item_name">



          {viewor==="editor"&&selectedDay===tomorrow&&<input className={`${edited?"input_edited":""}`} type="text" value={inputValue}
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
                    handleUpdate(item.id,"required",value)
                    setEdited(true)
                }
                

               }}
            />}
       
      
            {(viewor=="baker"||selectedDay==today)&&<span className={`reqNumber ${selectedDay==today?"flip":""}`} >{item.required}</span>} 
            
            {item.title}</td>
          
          <td className="item_required">

          {viewor==="baker"&&selectedDay===yesterday&&<span className={`icon ${isDone?"on":""}`}></span>}
           {/* {viewor==="baker"&&selectedDay!==yesterday&&
            <div className="label_abs">
            <label>Done </label>
              <button 
                 className={`btn_switch ${isDone?'on':'off'}`}
                 onClick = {(e)=>{
                  setIsDone(!isDone)
                   handleUpdate(item.id,'isDone',!isDone)
                  }}
            >
              <span></span>
              </button>
             </div>
             
            } */}
            </td>

            <td className="action">
            {viewor==="baker"&&selectedDay!==yesterday&&
             <Switcher handler={handleUpdate} 
             field="isDone" 
             label="done"
             item={item}/>}

              {selectedDay===today&&viewor==="editor"&&
            <Switcher handler={handleUpdate} 
           field="instock" 
           label="stock"
           item={item}/>}

              {selectedDay===tomorrow&&viewor==="editor"&&<Actions item={item} categories={categories} handleUpdate={handleUpdate}/>}
           
            </td>
          {/* <td className="item_prepared">{item.prepared}</td> */}
         
      </tr>

    </>

}