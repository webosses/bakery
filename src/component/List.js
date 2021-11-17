import React from 'react';
import Item from "./Item";

function List({products}){

    
   
   let category="";
    return <>
    <table>
        <thead>
            <tr>
            <th>name</th>
            <th>instock</th>
            <th>required</th>
            <th>prepared</th>
            </tr>
        </thead>
        <tbody>
     {
        products.length===0?"no products availabel":
        products.map(item=>{

            let printHeader = false;

            if(category===""||item.category!==category){
                category = item.category;
                printHeader = true;
                
            }
            
            

            return (
               
            <Item key={item.id} item={item} printHeader={printHeader} />)
         })//end map
     }

     </tbody>
     </table>
    </>

}

export default List
