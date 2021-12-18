import React,{useEffect, useState} from 'react'
import { useGlobalContext } from '../context';


function DeleteButton() {
    const [deleted,setDeleted] = useState(0)
    const [completed,setCompleted]=useState(true)
    const {env,getDailyProduct,setProducts,selectedDay,products,sortedProducts} = useGlobalContext();

  useEffect(()=>{
      console.log("full list",products,"short list",sortedProducts)

  },[deleted])
     const deleteAll=()=>{
         setCompleted(false)
      const old =getDailyProduct(selectedDay)
    
    //  console.log(old,old.length)
     
      old.forEach(p=>{

        env.getEntry(p.id)
       .then(entry=>entry.unpublish())
       .then(entry=>{
           setDeleted(n=>n+1)
           if(deleted === old.length){
            setCompleted(true)
           } 
         setProducts((products)=>products.filter(pro=>pro.id!==p.id))
       console.log(entry,'unpublished')
       }).catch(console.error())
      // console.log(result)
       // console.log(p.id,p.title,p.date)
      })
    }
    return (
        <div className="delete_btn">
            {!completed&&<div className="notice progressing del_note"><h2>Deleting...({deleted})</h2></div>}
            <button disabled={!completed} className="btn" onClick={(e)=>{
      setTimeout(()=>deleteAll(),1000)
      }}>delete</button>
        </div>
    )
}

export default DeleteButton
