import React from 'react'
import { useGlobalContext } from '../context';
import List from '../component/editor/List';

import Loading from '../component/Loading';
import Error from '../component/Error';



function Editor() {


    const {today,hasTomorrowData,copyProducts,selectedDay,isLoading,error,sortedProducts,viewor,sortKey,setSortKey,filterKeys,handleFilter,categories} = useGlobalContext();
console.log('sortedProducts in Editor',sortedProducts,isLoading)
console.log('tomorrow availabel',hasTomorrowData);

    if(sortedProducts.length==0)return "no product availabel";
    return <>
    
      {error&&<Error msg={error.msg}/>}
      {isLoading?<Loading/>:<List products={sortedProducts}  />}
      {selectedDay==today&&!hasTomorrowData&&<button onClick={copyProducts} className="btn btn_primary btn_add">Copy for tomorrow</button>}

      
      

      
    </>
}

export default Editor
