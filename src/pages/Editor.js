import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../context';
import List from '../component/List';

import EmptyData from '../component/EmptyData';
import CopyButton from '../component/CopyButton';
import today,{tomorrow,yesterday,dayBefore} from "../util"




function Editor() {

    const [copyCompleted,setCopyCompleted] = useState(true)
    const {env,sortedProducts,filterKeys,getDailyProduct,dailyProducts,setProducts,hasTomorrowData,selectedDay,products} = useGlobalContext();

    const getOldDayProducts=(day)=>{
      const temp = getDailyProduct(dayBefore(day))
      if(temp.length>0)return temp;
  
      //const t = Math.ceil(len / 33)//33 products so far, need to think a way to caculate dynamically
      //console.log("daybefore",dayBefore(day))
      return getOldDayProducts(dayBefore(day))
  
    }
  // console.log('tomorrow',new Date(tomorrow))
    const copyProducts = (e)=>{
      e.preventDefault()
      setCopyCompleted(false)
  
      console.log(products)
  
      let newData = [];//to merge into products list using setProducts
      const dateFor = sortedProducts.length>0?tomorrow:today;//update new data field "date"
      const day = dateFor==tomorrow?today:yesterday
      const oldData = getOldDayProducts(day);
         console.log(oldData);
  
      //for detect if all today's data copied to contentful
      const oldDataLength = oldData.length;
      if(oldDataLength==0)return;
  
      let created = 0;
      oldData.forEach(pro=>{
        setCopyCompleted(false)
        let fields = {}
        let newDataItem = {}
        for(let [key,value] of Object.entries(pro)){
          //reset data
         
          if(key=='id')continue
          if(key=='date')value = dateFor ;
          if(key=='isDone')value=false ;
          if(key=='prepared')value = 0 ;
         
          newDataItem = {...newDataItem,[key]:value}
          fields = {...fields,[key]:{"en-US": value}}
          
        }
        newData =[...newData,newDataItem]
        console.log(newData)
  
        // console.log('fields',fields)
          setTimeout(addDataToContentful(fields),1000)
  created+=1;
          if(created==oldDataLength){
            setProducts(products=>{
              return [...products,...newData]
            })
            setCopyCompleted(true)
          }
        
        //env createEntry
      })
     // console.log(oldData);
  
    }
  
    const addDataToContentful = (fields)=>{
      let created = 0;
      env.createEntry('bakeryProduct',{fields: fields})
    .then(product=>{
      created +=1;
     return product.publish()
    }) 
    .then(product=>console.log(product))
    .catch(console.error)
  
    }
    // console.log(filterKeys)
    // useEffect(()=>{
    //   setFilterKeys(initFilter())
    // },[])

    // useEffect(()=>{
    //   // console.log(filterKeys)
    // const filteredPros = filterProducts(dailyProducts)
    //  setSortedProducts(filteredPros)

    
    // },[filterKeys])
  
    const deleteAll=()=>{
      const old =getDailyProduct(today)
      console.log(old,old.length)
     
      old.forEach(p=>{
       const result= env.getEntry(p.id)
       .then(entry=>{
       setTimeout(entry.unpublish(),1000);
       })
       .then(entry=>{
       console.log(entry,'unpublished')
       }).catch(console.error())
       console.log(result)
       // console.log(p.id,p.title,p.date)
      })
    }

   // if(sortedProducts.length==0)return "no product availabel";
   const hasProducts = sortedProducts.length>0;

    if(!copyCompleted) return <div className="copying"><h2>Copying...</h2></div>
    

    return <>
      {/* <span className="delete_btn" onClick={(e)=>{
      deleteAll()
      }}>delete</span> */}
      <div className="editor">
      {hasProducts?<List products={sortedProducts}/>:<EmptyData/>}
      </div>
      
      {selectedDay==today&&hasProducts&& !hasTomorrowData &&<CopyButton disabled={!copyCompleted}  handler={copyProducts} title="Copy for tomorrow"/>}
      {selectedDay==today&&!hasProducts&&<CopyButton disabled={!copyCompleted} handler={copyProducts} title="Copy from nearest day"/>}
      
      

      
    </>
}

export default Editor
