import React from 'react';
import {useGlobalContext} from '../context';

//actions {hasAction bool, markup func }
export default function Item({item,printHeader}){
  const {viewor} =  useGlobalContext();
  
    return<>
     {printHeader&&<tr className="item_category_title"><th colSpan="4">{item.category}</th></tr>}
      <tr className="item">
          <td className="item_name">{item.title} </td>
          
          <td className="item_stock"><button className={`btn_switch ${item.instock?"on":"off"}`}><span></span></button></td>
          {/* <td className="item_stock">{item.stock}</td> */}
          <td className="item_required"><input type="text" value={item.required}/></td>
          {/* <td className="item_prepared">{item.prepared}</td> */}
          <td className="item_state"><button className={`btn_switch ${item.isDone?"on":"off"}`}><span></span></button></td>
          {/* <td className="item_action"><button onClick={markup}>{item.isDone?'undo':'Done'}</button></td> */}
      </tr>

    </>

}