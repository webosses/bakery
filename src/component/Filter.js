import React,{useState,useEffect} from "react";

export default function Filter({handleFilter,categories,viewor,showFilters,filterKeys}){

    const [selectedCa,setSelectedCa]=useState(filterKeys.category)
    console.log(filterKeys,"filter comp")

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
           
           if(filterKeys.category.length===0)return false;
           
            for(var i=0; i<selectedCa.length; i++){
                  
                if(selectedCa[i]==name){
                    return true;
                }
            }
            return false;

           

             
           
    }

    useEffect(()=>{
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
            handleCheckboxes(e)
//console.log('target',e.target.checked,e.target.value)
           // handleFilter({category:[e.target.checked]})
        }
            } /></label>
    })}
   
   </div>

   


   
<div className="filter_row">
    <label>
        <span>In stock</span>
        <select onChange={(e)=>{
         handleFilter({instock:e.target.value})
        }}>

    <option value="-1" selected={filterKeys.instock===-"1"?"selected":""}></option>
    <option value="0" selected={filterKeys.instock==="0"?"selected":""}>No</option>
    <option value="1" selected={filterKeys.instock==="1"?"selected":""}>Yes</option>
    </select>

    </label>
   
    <label>
        <span>wrap-up</span>
        <select onChange={(e)=>{
         handleFilter({iswrap:e.target.value})
        }}>

    <option value="-1" selected={filterKeys.iswrap==="-1"?"selected":""}></option>
    <option value="0" selected={filterKeys.iswrap==="0"?"selected":""}>No</option>
    <option value="1" selected={filterKeys.iswrap==="1"?"selected":""}>Yes</option>
    </select>

    </label>

    {viewor==='baker'&&
   
   <label>
   <span>done</span>
  

   <select 
   onChange={(e)=>{
    handleFilter({isdone:e.target.value})
   }}>

<option value="-1" selected={filterKeys.isdone==="-1"?"selected":""}></option>
<option value="0" selected={filterKeys.isdone==="0"?"selected":""}>No</option>
<option value="1" selected={filterKeys.isdone==="1"?"selected":""}>Yes</option>
</select> </label>


}
    </div>
    </div>

    </div>
    </>
}