import React,{useState} from 'react'
import Switcher from './Switcher'

function Actions({item,handleUpdate,categories}) {
    // const [instock,setInstock] = useState(item.instock)
    // const [iswrap,setIswrap] = useState(item.iswrap)
    const [showBtns,setShowBtns] = useState(false)
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
                
                <select onChange={(e)=>handleUpdate(item.id,'category',e.target.value)}>
              <option></option>
              {categories.map((c,index)=>{
                return <option key={index} value={c} selected={c===item.category?'selected':''}>{c}</option>
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
