import React from 'react';
import Item from "./Item";
import { useGlobalContext } from '../context';


function List({products}){


    const {sortKey} = useGlobalContext();
    let printHeader=false;
    let category = ""
    console.log(sortKey)
   
//    let category="";
    return <>
    <table>
        {/* <thead>
            <tr>
            <th className="tname" width="80">name</th>
            <th className="treq"> {viewor==="editor"?"req":" "}</th>
            <th className="tact"></th>
            </tr>
        </thead> */}
        <tbody>
     {
        products.map(item=>{
            printHeader = false;

           

            if(sortKey==="category"&&(category===""||item.category!==category)){
                category = item.category;
                printHeader = true;
                
            }


            
            

            return (
               
            <Item item={item} printHeader={printHeader} key={item.id} />)
         })//end map
     }

     </tbody>
     </table>
    </>

}

export default List
