import React,{useState} from 'react';
import {useGlobalContext} from '../context';
// import Calendar from 'react-calendar';



//actions {hasAction bool, markup func }
export default function Item({item,printHeader}){
  const {categories,handleUpdate,viewor,selectedDay,today,yesterday} =  useGlobalContext();
  const [instock,setInstock] = useState(item.instock)
  const [iswrap,setIswrap] = useState(item.iswrap)
  const [required,setRequired] = useState(item.required)
  const [showBtns,setShowBtns] = useState(false)
  const [isDone,setIsDone] = useState(item.isDone)
  const [unstickTray,setUnstickTray] = useState(item.unstickTray)


  

  
    return<>
     {printHeader&&<tr className="item_category_title"><th colSpan="5">{item.category}</th></tr>}
      <tr className={`item ${item.instock?"instock":'outstock'}`}>
          <td className="item_name">
         {viewor=="editor"&&<input type="text" value={required}
               onChange = {(e)=>{
                let value = parseInt(Number(e.target.value))
                setRequired(value)
                handleUpdate(item.id,'required',value)

               }}
            />}
            {viewor=="baker"&&<span className={`reqNumber ${selectedDay==today?"flip":""}`} >{item.required}</span>} 
            
            {item.title}</td>
          
          <td className="item_required">
          {viewor==="baker"&&selectedDay===yesterday&&<span className={`icon ${isDone?"on":""}`}></span>}
           {viewor==="baker"&&selectedDay!==yesterday&&
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
             
            }
            </td>

            <td className="action">
              {selectedDay!==yesterday&&<button className="trigerBtn" onClick={(e)=>{
                setShowBtns(!showBtns)
              }}>...</button>}
              

              <div className={`action_btns ${showBtns?'show':''}`}>
                <span className="btnClose" onClick={()=>{
                   setShowBtns(!showBtns)
                }}></span>

              <div>
                
                <select onChange={(e)=>handleUpdate(item.id,'category',e.target.value)}>
              <option></option>
              {categories.map(c=>{
                return <option value={c} selected={c===item.category?'selected':''}>{c}</option>
              })}
            </select>
            </div>

            {/* <div>
          <input type = "number" min="0" max="10" value={item.days} onChange={(e)=>{
            if(e.target.value>=0){
              handleUpdate(item.id,'days',e.target.value)
            }
          }}/>
           </div>

            <div>
          <label>unstick </label>
            <button 
               className={`btn_switch ${instock?'on':'off'}`}
               onClick = {(e)=>{
                setUnstickTray(!unstickTray)
                 handleUpdate(item.id,'unstickTray',!unstickTray)
                }}
          >
            <span></span>
            </button>
           </div> */}

          <div>
          <label>stock </label>
            <button 
               className={`btn_switch ${instock?'on':'off'}`}
               onClick = {(e)=>{
                 setInstock(!instock)
                 handleUpdate(item.id,'instock',!instock)
                }}
          >
            <span></span>
            </button>
           </div>


          <div>
          <label>wrapup</label>
            <button 
               className={`btn_switch ${iswrap?'on':'off'}`}
               onClick = {(e)=>{
                setIswrap(!iswrap)
                 handleUpdate(item.id,'instock',!iswrap)
                }}
          >
            <span></span>
            </button>
           </div>



              </div>
            </td>
          {/* <td className="item_prepared">{item.prepared}</td> */}
         
      </tr>

    </>

}