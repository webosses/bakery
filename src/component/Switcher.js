import React,{useState} from 'react'

function Switcher({handler,label,field,item}) {
    const [state,setState] = useState(item[field])//true or false

    return (
        <div className="label_abs">
        <label className="">{label}</label>
          <button 
             className={`btn_switch ${state?'on':'off'}`}
             onClick = {(e)=>{
               setState(!state)
               handler(item.id,field,!state)
              }}
        >
          <span></span>
          </button>
         </div>
    )
}

export default Switcher
