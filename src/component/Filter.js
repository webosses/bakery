import React,{useState,useEffect} from "react";
import { useGlobalContext } from '../context';


export default function Filter({showFilters}){
    const {viewor,handleFilter,filterKeys,categories,initFilter,setFilterKeys} =useGlobalContext();

    const [selectedCa,setSelectedCa]=useState(filterKeys.category)
    // console.log(filterKeys,"filter comp")

    const handleCheckboxes = (event)=>{
        if(event.target.value=='all'){
            setSelectedCa([]);
            return;
        }
          if(event.target.checked){
              //console.log('checked', event.target.value)
              setSelectedCa((old)=>{
                  return [...old,event.target.value];
              })
          }else{
              setSelectedCa((old)=>{
                  return old.filter(c=>c!=event.target.value)
              })
          }

        
    }
    const isChecked = (name)=>{
           if(name=='all'){
               return selectedCa.length===0
           }
           
           if(filterKeys.category.length===0)return false;
           
            for(var i=0; i<selectedCa.length; i++){
                  
                if(selectedCa[i]==name){
                    return true;
                }
            }
            return false;

           

             
           
    }

    useEffect(()=>{
       // console.log('category changed',filterKeys,selectedCa)
        
        handleFilter({category:selectedCa})
    },[selectedCa])

    

   
    return<>
    <div className="search_box">
        <div className="search_input">
    <label><span></span></label>
        <input type="text" onChange={(e)=>{
            handleFilter({name:e.target.value})
        }}/>
     </div>
    </div>

    <div className={`filters ${showFilters?"show":""}`}>

         

{showFilters&&filterKeys!==initFilter()&&<div><span className="btn btn_clear" onClick={()=>{
    setFilterKeys(initFilter())
    setSelectedCa([]);
    }}>clear</span></div>}

       <div className="wrap_filter_items">
     <div className="filter_row">
    <label><span>all</span><input type="checkbox" value='all' name="category" checked={isChecked('all')}  onChange={(e)=>{
            handleCheckboxes(e)
//console.log('target',e.target.checked,e.target.value)
           // handleFilter({category:[e.target.checked]})
        }
            } /></label>
    {categories.map((category,index)=>{
        return  <label key={index}><span>{category}</span>
        <input  type="checkbox" 
        checked={isChecked(category)} 
        value={category} name="category"  
         onChange={(e)=>{
            // console.log('is checked',e.target.checked)
            handleCheckboxes(e)
//console.log('target',e.target.checked,e.target.value)
           // handleFilter({category:[e.target.checked]})
        }
            } /></label>
    })}
   
   </div>

     
<div className="filter_row">
    <label>
        <span>stock</span>
        <select 
        defaultValue={filterKeys.instock}
        onChange={(e)=>{
         handleFilter({instock:e.target.value})
        }}>

    <option value="-1"></option>
    <option value="0">outstock</option>
    <option value="1">instock</option>
    </select>

    </label>
   
    <label>
        <span>wrap-up</span>
        <select defaultValue={filterKeys.iswrap} onChange={(e)=>{
         handleFilter({iswrap:e.target.value})
        }}>

    <option value="-1"></option>
    <option value="0">No</option>
    <option value="1">Yes</option>
    </select>

    </label>

    {viewor==='baker'&&
   
   <label>
   <span>done</span>
  

   <select 
   defaultValue={filterKeys.isdone}
   onChange={(e)=>{
    handleFilter({isdone:e.target.value})
   }}>

<option value="-1"></option>
<option value="0">No</option>
<option value="1">Yes</option>
</select> </label>


}
    </div>
    </div>

    </div>
    </>
}