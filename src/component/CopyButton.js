import React,{useEffect,useState} from 'react'
import today,{tomorrow,yesterday,dayBefore} from "../util"
import { useGlobalContext } from '../context';


function CopyButton({title}) {


    const [copyCompleted,setCopyCompleted] = useState(true)
    const [NewItemCreated, setNewItemCreated] = useState(1)
    const [oldProductsLength,setOldProductsLength]=useState(0)
    const {env,sortedProducts,getDailyProduct,setProducts,selectedDay,products} = useGlobalContext();

    const getOldDayProducts=(day)=>{
      const temp = getDailyProduct(dayBefore(day))
      if(temp.length>0)return temp;
  
      //const t = Math.ceil(len / 33)//33 products so far, need to think a way to caculate dynamically
      //console.log("daybefore",dayBefore(day))
      return getOldDayProducts(dayBefore(day))
  
    }

    useEffect(()=>{
        console.log(sortedProducts)

      if(NewItemCreated===oldProductsLength){
        setCopyCompleted(true)
      }

    },[NewItemCreated])


   
  // console.log('tomorrow',new Date(tomorrow))
    const copyProducts = (e)=>{
      e.preventDefault()
      setCopyCompleted(false)
      //setNewItemCreated(3)
      
    // console.log(NewItemCreated)
    //  console.log(products)
  
    //  let newData = [];//to merge into products list using setProducts
      const dateFor = sortedProducts.length>0?tomorrow:selectedDay;//update new data field "date"
      const day = dateFor==tomorrow?today:yesterday//data from day
      const oldData = getOldDayProducts(day);
         console.log(oldData);
  
      //for detect if all today's data copied to contentful
      if(oldData.length==0)return;
     setOldProductsLength(oldData.length);
     
  
      oldData.forEach(pro=>{
       
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
      //  newData =[...newData,newDataItem]
      //   console.log(newData)
      //  console.log('fields',fields)
      //  console.log([...products,...newData])
      //  return;

          setTimeout(()=>addDataToContentful(fields,newDataItem),1500)

         
         
        
        //env createEntry
      })
     // console.log(oldData);
  
    }
  
    const addDataToContentful = (fields,newProduct)=>{
      
      env.createEntry('bakeryProduct',{fields: fields})
    .then(product=>{
    //   console.log('created contentful',NewItemCreated)
      setNewItemCreated((num)=>num+1)
     return product.publish()
    }) 
    .then(product=>setProducts((products)=>[...products,{...newProduct,id:product.sys.id}]))
    .catch(console.error)
  
    }
    return (
        <div>
            {!copyCompleted&&<div className="notice progressing copy_note"><h2>Copying...({NewItemCreated})</h2></div>}
            <button disabled={!copyCompleted} onClick={copyProducts} className="btn btn_primary btn_add">{title}</button>
        </div>
    )
}

export default CopyButton
