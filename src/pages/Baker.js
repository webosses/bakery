import React from 'react'
import { useGlobalContext } from '../context';
import List from '../component/List';
import EmptyData from '../component/EmptyData';




function Baker() {

    const {bakerProducts,sortKey,sortProducts,sortedProducts} = useGlobalContext();
    
    // const sortedBakerProducts = sortProducts(bakerProducts);
    // console.log(sortKey)

    const hasProducts = sortedProducts.length>0;
   

   

    return <>
    
    <div className="baker">

    {hasProducts?<List />:<EmptyData/>}
    </div>

      
      

      
    </>
}

export default Baker
