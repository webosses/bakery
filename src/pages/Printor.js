import React from 'react';
import List from '../component/printor/List';
import { useGlobalContext } from '../context';

function Printor() {
    const {sortedProducts} = useGlobalContext();
    const instock = sortedProducts.filter(product=>product.instock==true)
    const outstock = sortedProducts.filter(product=>product.instock!=true)
    return <>
       
        <div className="main_list">
            <List products={instock} />
        </div>

        <div className="side_list">
        <List products={outstock}/>
        </div>
    </>
}

export default Printor
