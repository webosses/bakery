import React from 'react'
import { useGlobalContext } from '../context';
import List from '../component/List';

import EmptyData from '../component/EmptyData';
import CopyButton from '../component/CopyButton';
import DeleteButton from '../component/deleteButton';
import today,{tomorrow,yesterday,dayBefore} from "../util"




function Editor() {

    // const [copyCompleted,setCopyCompleted] = useState(true)
    // const [NewItemCreated, setNewItemCreated] = useState(1)
    // const [newProduct,setNewProduct] = useState(null)
    // const [oldProductsLength,setOldProductsLength]=useState(0)
    const {env,sortedProducts,getDailyProduct,setProducts,hasTomorrowData,selectedDay,products} = useGlobalContext();

    // const getOldDayProducts=(day)=>{
    //   const temp = getDailyProduct(dayBefore(day))
    //   if(temp.length>0)return temp;
  
    //   //const t = Math.ceil(len / 33)//33 products so far, need to think a way to caculate dynamically
    //   //console.log("daybefore",dayBefore(day))
    //   return getOldDayProducts(dayBefore(day))
  
    // }

  //   useEffect(()=>{

  //     if(NewItemCreated===oldProductsLength){
  //       setCopyCompleted(true)
  //     }

  //   },[NewItemCreated])
  // // console.log('tomorrow',new Date(tomorrow))
  //   const copyProducts = (e)=>{
  //     e.preventDefault()
  //     setCopyCompleted(false)
  //     //setNewItemCreated(3)
      
  //   // console.log(NewItemCreated)
  //   //  console.log(products)
  
  //     let newData = [];//to merge into products list using setProducts
  //     const dateFor = sortedProducts.length>0?tomorrow:today;//update new data field "date"
  //     const day = dateFor==tomorrow?today:yesterday//data from day
  //     const oldData = getOldDayProducts(day);
  //        console.log(oldData);
  
  //     //for detect if all today's data copied to contentful
  //     if(oldData.length==0)return;
  //    setOldProductsLength(oldData.length);
     
  
  //     oldData.forEach(pro=>{
  //       setNewProduct(null)
  //       let fields = {}
  //       let newDataItem = {}
  //       for(let [key,value] of Object.entries(pro)){
  //         //reset data
         
  //         if(key=='id')continue
  //         if(key=='date')value = dateFor ;
  //         if(key=='isDone')value=false ;
  //         if(key=='prepared')value = 0 ;
         
  //         newDataItem = {...newDataItem,[key]:value}
  //         fields = {...fields,[key]:{"en-US": value}}
          
  //       }
  //       newData =[...newData,newDataItem]
  //     //   console.log(newData)
  //     //  console.log('fields',fields)
  //     //  console.log([...products,...newData])
  //     //  return;

  //         setTimeout(()=>addDataToContentful(fields,newData),1500)
  //         if(newProduct!==null){
  //           setProducts(()=>{
  //            return [...products,newProduct]
  //           })
  //         }
  //       //  console.log(oldProductsLength,"created",NewItemCreated)
         
        
  //       //env createEntry
  //     })
  //    // console.log(oldData);
  
  //   }
  
  //   const addDataToContentful = (fields,newProduct)=>{
      
  //     env.createEntry('bakeryProduct',{fields: fields})
  //   .then(product=>{
  //     console.log('created contentful',NewItemCreated)
  //     setNewItemCreated((num)=>num+1)
  //    return product.publish()
  //   }) 
  //   .then(product=>setNewProduct({...newProduct,id:product.sys.id}))
  //   .catch(console.error)
  
  //   }
    // console.log(filterKeys)
    // useEffect(()=>{
    //   setFilterKeys(initFilter())
    // },[])

    // useEffect(()=>{
    //   // console.log(filterKeys)
    // const filteredPros = filterProducts(dailyProducts)
    //  setSortedProducts(filteredPros)

    
    // },[filterKeys])
  
    // const deleteAll=()=>{
    //   const old =getDailyProduct(selectedDay)
    // //  console.log(old,old.length)
     
    //   old.forEach(p=>{
    //    const result= env.getEntry(p.id)
    //    .then(entry=>{
    //    setTimeout(()=>entry.unpublish(),1000);
    //    })
    //    .then(entry=>{
    //      setProducts(()=>products.filter(pro=>pro.id!==p.id))
    //    console.log(entry,'unpublished')
    //    }).catch(console.error())
    //   // console.log(result)
    //    // console.log(p.id,p.title,p.date)
    //   })
    // }

   // if(sortedProducts.length==0)return "no product availabel";
   const hasProducts = sortedProducts.length>0;

   // if(!copyCompleted) return <div className="copying"><h2>Copying...</h2></div>
    

    return <>
      {/* <span className="delete_btn" onClick={(e)=>{
      setTimeout(()=>deleteAll(),1000)
      }}>delete</span> */}
      <div className="editor">
      {/* {hasProducts&&<DeleteButton/>} */}
      {hasProducts?<List />:<EmptyData/>}
      
      
      {selectedDay==today&&hasProducts&&!hasTomorrowData &&<CopyButton title="copy for tomorrow"/>}
      
      </div>

      
    </>
}

export default Editor
