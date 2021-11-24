import React,{useState,useEffect} from "react";

export default function Filter({handleFilter,filterKeys,categories}){

    const [selectedCa,setSelectedCa]=useState([])

    const handleCheckboxes = (event)=>{
        if(event.target.value=='all'){
            setSelectedCa([]);
            return;
        }
          if(event.target.checked){
              setSelectedCa(()=>{
                  return [...selectedCa,event.target.value];
              })
          }else{
              setSelectedCa(()=>{
                  return selectedCa.filter(c=>c!=event.target.value)
              })
          }

        
    }
    const isChecked = (name)=>{
           if(name=='all'){
               return selectedCa.length===0
           }
           

            for(var i=0; i<selectedCa.length; i++){
                  
                if(selectedCa[i]===name){
                    return true;
                }
            }
            return false;

           

             
           
    }

    useEffect(()=>{
        handleFilter({category:selectedCa})
    },[selectedCa])
   
    return<>
    <div className="filters">
        <div className="form_title">Filter By</div>
     <div className="filter_row">
    <span>Category</span>
    <label><span>all</span><input type="checkbox" value='all' name="category" checked={isChecked('all')}  onChange={(e)=>{
            handleCheckboxes(e)
//console.log('target',e.target.checked,e.target.value)
           // handleFilter({category:[e.target.checked]})
        }
            } /></label>
    {categories.map(category=>{
        return <label><span>{category}</span><input type="checkbox" checked={isChecked(category)} value={category} name="category"   onChange={(e)=>{
            handleCheckboxes(e)
//console.log('target',e.target.checked,e.target.value)
           // handleFilter({category:[e.target.checked]})
        }
            } /></label>
    })}
   
   </div>

    <label>
        <span>Name</span>
        <input type="text" onChange={(e)=>{
            handleFilter({name:e.target.value})
        }}/>

    </label>

    <label>
        <span>Prepared</span>
        <select 
        onChange={(e)=>{
         handleFilter({isdone:e.target.value})
        }}>

    <option value="-1" selected={filterKeys.isdone==-1}></option>
    <option value="0" selected={filterKeys.isdone==0}>No</option>
    <option value="1" selected={filterKeys.isdone==1}>Yes</option>
    </select>

    </label>

    <label>
        <span>In stock</span>
        <select onChange={(e)=>{
         handleFilter({instock:e.target.value})
        }}>

    <option value="-1"></option>
    <option value="0">No</option>
    <option value="1">Yes</option>
    </select>

    </label>
   
    <label>
        <span>wrap-up</span>
        <select onChange={(e)=>{
         handleFilter({iswrap:e.target.value})
        }}>

    <option value="-1"></option>
    <option value="0">No</option>
    <option value="1">Yes</option>
    </select>

    </label>


    </div>
    </>
}