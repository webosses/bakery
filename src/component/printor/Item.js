import React from 'react';
//import {useGlobalContext} from '../../context';

//actions {hasAction bool, markup func }
export default function Item({item,printHeader}){
 // const {viewor} =  useGlobalContext();
  
    return<>
    {printHeader&&<tr className="item_category_title"><th colSpan="4">{item.category}</th></tr>}
      <tr className="item">
          <td className="box"><span></span></td>
          <td className="item_name">{item.title} </td>
          <td className="item_required"><input type="text" value={item.required}/></td>
      </tr>

    </>

}