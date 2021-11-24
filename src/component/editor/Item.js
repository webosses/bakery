import React,{useState} from 'react';
import {useGlobalContext} from '../../context';
// import Calendar from 'react-calendar';



//actions {hasAction bool, markup func }
export default function Item({item,printHeader}){
  const {categories,handleUpdate} =  useGlobalContext();
  const [instock,setInstock] = useState(item.instock)
  const [iswrap,setIswrap] = useState(item.iswrap)
  const [required,setRequired] = useState(item.required)
  
  // const [hasDate,setHasDate] = useState(isEqualDate)
  

  
    return<>
     {printHeader&&<tr className="item_category_title"><th colSpan="5">{item.category}</th></tr>}
      <tr className="item">
          <td className="item_name">{item.title} </td>
          <td>
            <select onChange={(e)=>handleUpdate(item.id,'category',e.target.value)}>
              <option>select a category</option>
              {categories.map(c=>{
                return <option value={c} selected={c===item.category?'selected':''}>{c}</option>
              })}
            </select></td>
          <td className="item_stock">
            <button 
               className={`btn_switch ${instock?'on':'off'}`}
               onClick = {(e)=>{
                 setInstock(!instock)
                 handleUpdate(item.id,'instock',!instock)
                }}
          >
            <span></span>
            </button>
            </td>
          {/* <td className="item_stock">{item.stock}</td> */}
          <td className="item_required">
            <input type="text" value={required}
               onChange = {(e)=>{
                let value = parseInt(Number(e.target.value))
                
                setRequired(value)
                handleUpdate(item.id,'required',value)
               }}
            />
            </td>
          {/* <td className="item_prepared">{item.prepared}</td> */}
          <td className="item_prepared">
            <button className={`btn_switch ${iswrap?"on":"off"}`}
             onClick = {(e)=>{
              setIswrap(!iswrap)
              handleUpdate(item.id,'iswrap',!iswrap)
             }}>
              <span></span></button>
            </td>
          {/* <td className="item_action"><button onClick={markup}>{item.isDone?'undo':'Done'}</button></td> */}
      </tr>

    </>

}