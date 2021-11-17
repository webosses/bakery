import React from 'react';
import Item from "./Item";

function List({products}){

  

   let category="";
    return <>
    <table className="instock">
        <thead>
            <tr>
            <th>prepared</th>
            <th>name</th>
            <th>required</th>
            </tr>
        </thead>
        <tbody>
     {

         products.map(item=>{

            let printHeader = false;

            if(category===""||item.category!==category){
                category = item.category;
                printHeader = true;
                
            }
            
            

            return (
                
                
            <Item key={item.id} item={item} printHeader ={printHeader} />)
         })
     }
     </tbody>
     </table>
    </>

}

export default List
