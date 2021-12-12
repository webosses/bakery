import React,{useState} from 'react'
import Switcher from './Switcher'

function Actions({item,handleUpdate,categories}) {
    // const [instock,setInstock] = useState(item.instock)
    // const [iswrap,setIswrap] = useState(item.iswrap)
    const [showBtns,setShowBtns] = useState(false)
    const [days,setDays] = useState(item.days)
    // const [unstickTray,setUnstickTray] = useState(item.unstickTray)

    return <>
        <button className="trigerBtn" onClick={(e)=>{
                setShowBtns(!showBtns)
              }}>...</button>
              

              <div className={`action_btns ${showBtns?'show':''}`}>
                <span className="btnClose" onClick={()=>{
                   setShowBtns(!showBtns)
                }}></span>

              <div>
                
                <select
                defaultValue={item.category}
                 onChange={(e)=>handleUpdate(item.id,'category',e.target.value)}>
              <option></option>
              {categories.map((c,index)=>{
                return <option key={index} value={c}>{c}</option>
              })}
            </select>
            </div>


            <div>
                <label>days</label>
          <input type = "number" min="0" max="10" value={days} 
          onFocus={e=>e.target.select()}
          onChange={(e)=>{
              setDays(()=>e.target.value)
           // if(e.target.value>=0){
              handleUpdate(item.id,'days',parseInt(e.target.value))
           // }
          }}/>
           </div>

            {/* 

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
           <Switcher handler={handleUpdate} 
           field="instock" 
           label="stock"
           item={item}/>

          {/* <div>
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
           </div> */}


<Switcher handler={handleUpdate} 
           item={item}
           label="wrapup"
           field="iswrap"
          />

          {/* <div>
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
           </div> */}



              </div>
    </>
}

export default Actions
