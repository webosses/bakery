import React from 'react';
import Item from "./Item";
import { useGlobalContext } from '../../context';

function List({products}){
    const {sortKey} = useGlobalContext();

  

   let category="";
    return <>
    <table className="instock">
       
        <tbody>
     {

         products.map(item=>{

            let printHeader = false;
            if(sortKey==="category"&&(category===""||item.category!==category)){
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
