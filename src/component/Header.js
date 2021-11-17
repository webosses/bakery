import React from 'react';
import SortForm from './Sort';
import Filter from './Filter';
import { useGlobalContext } from '../context';



function Header({children}) {
   const {today,tomorrow,yesterday,selectedDay,setSelectedDay,viewor,sortKey,setSortKey,filterKeys,handleFilter,categories} =useGlobalContext();
    return (
        <div className="header">
            <div className="btn_dates nav">
                <button  className={`btn_yesterday ${selectedDay==yesterday? ' on':''}`} onClick={()=>{
                    setSelectedDay(yesterday)
                }}>Yesterday</button>

<button className={`btn_today ${selectedDay==today?' on':''}`} onClick={()=>{
                    setSelectedDay(today)
                }}>Today</button>

<button  className={`btn_tomorrow ${selectedDay==tomorrow? ' on':''}`} onClick={()=>{
                    setSelectedDay(tomorrow)
                }}>Tomorrow</button>
            </div>

         {viewor=='editor'&&<div className="search_bar"><SortForm setSortKey={setSortKey} sortKey={sortKey}/>

<Filter  
filterKeys={filterKeys}
handleFilter={handleFilter} 
categories = {categories}
/></div>
}
         
         

            {children}
        </div>
    )
}

export default Header
