import React,{useEffect} from 'react';
import List from '../component/printor/List';
import { useGlobalContext } from '../context';

function Printor() {
    const {sortedProducts,selectedDay,setFilterKeys,initFilter} = useGlobalContext();
    const wrap = sortedProducts.filter(product=>product.iswrap===true)
    const unwrap = sortedProducts.filter(product=>product.iswrap!==true)
    const outstock = sortedProducts.filter(product=>product.instock!==true)

    useEffect(()=>{
        setFilterKeys(()=>initFilter())
    })
    
return <>
       <div className="printor">
       <h2 className="printor_date">{new Date(selectedDay).toLocaleDateString()}</h2>
       <button className="btn_printor" onClick={()=>window.print()}>Print</button>
        <div className="main_list">
            <div className="wrap_list">
                <h3>wrap-up</h3>
            <List products={wrap} />
            </div>
            <div className="wrap_list">
            <h3>not wrap-up</h3>

            <List products={unwrap} />
            </div>

        </div>
       
        <div className="side_list">
            {outstock.length>0&&
            
            <div className="wrap_list">
        <h3>outstock</h3>
        <List products={outstock} />
        </div>}

        </div>
        </div>
    </>
}

export default Printor
