import React from 'react';
//import {useGlobalContext} from '../../context';

//actions {hasAction bool, markup func }
export default function Item({item,printHeader}){
  const withNumber = false;
  
 // const {viewor} =  useGlobalContext();
 function getOffsetDate(date,days){
      const newDate= new Date(date.getFullYear(),date.getMonth(),date.getDate()+(days-1))
      console.log(newDate)
     return `${newDate.getDate()}/${newDate.getMonth()+1}`
 }
  
    return<>
    {printHeader&&<tr className="item_category_title"><th colSpan="4">{item.category}</th></tr>}
      <tr className="item">
          <td className="cbox"><span></span></td>
          <td className="item_name">
            {withNumber&&<span className="reqNumber">{item.required}</span>}
            {item.title} 
            {item.unstickyTray===true&&<span className="label_unstick">u</span>}
            {item.days>0&&<div className="label_days"><span>{item.days}</span><span>{getOffsetDate(new Date(item.date),item.days)}</span></div>}
            </td>
      </tr>

    </>

}