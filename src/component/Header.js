import React,{useState} from 'react';
import SortForm from './Sort';
import Filter from './Filter';
import { useGlobalContext } from '../context';



function Header({children}) {
   const {today,tomorrow,yesterday,selectedDay,setSelectedDay,viewor,sortKey,setSortKey,filterKeys,handleFilter,categories} =useGlobalContext();
   const [showFilters,setShowFilters] = useState(false) 
   return (
        <div className="header">
                        <div className="brand">Exp Bakery</div>

            <div className="btn_dates nav">
                <button  className={`btn_yesterday ${selectedDay===yesterday? ' on':''}`} onClick={()=>{
                    setSelectedDay(yesterday)
                }}>Yesterday</button>

<button className={`btn_today ${selectedDay===today?' on':''}`} onClick={()=>{
                    setSelectedDay(today)
                }}>Today</button>

<button  className={`btn_tomorrow ${selectedDay===tomorrow? ' on':''}`} onClick={()=>{
                    setSelectedDay(tomorrow)
                }}>Tomorrow</button>
            </div>

         {viewor!=='printer'&&
         <div className="filters_box">
             <div className="btn_filter"> 
            
             <div className={`btn_filter_btn ${showFilters?"on":""}`} onClick={()=>{
                 setShowFilters(!showFilters)
             }}>
                 <span></span>
                 <span></span>
                 <span></span>
            </div>
            </div>
             <SortForm setSortKey={setSortKey} sortKey={sortKey}/>

<Filter  
filterKeys={filterKeys}
handleFilter={handleFilter} 
categories = {categories}
viewor ={viewor}
showFilters={showFilters}
filterKeys = {filterKeys}
/></div>
}
         
         

            {children}
        </div>
    )
}

export default Header
