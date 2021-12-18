import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../context';


function Tasks() {
    const [tasks,setTasks] = useState([])
    const [isLoading,setIsLoading] = useState([])


    const {client,selectedDay} = useGlobalContext();
    const getTasks = ()=>{

    }

    const formateData =(items)=>{
      let newItems = [];

       items.forEach(item => {
        
      
        // console.log(item);
        const id = item.sys.id;
       
        const category = item.fields.hasOwnProperty('parent')?item.fields.parent.fields.name:0;
        
        
        if(!newItems.hasOwnProperty(category)){
          newItems[category]= new Array()
          newItems[category]['children']=new Array()
         
        }

         // newItems[category]={ ...item.fields,id,category}

        
        newItems[category]['children'].push({ ...item.fields,id,category});

        

   
      })

      return newItems;
    }

    console.log(tasks)
    //fetch tasks from contentful

useEffect(()=>{
    client.getEntries({
      limit:200,
      content_type:'tasks',
      order:'-fields.date,fields.index'
   })
 .then(response=>{
      
    setTasks(()=>formateData(response.items))
    setIsLoading(false)
    // console.log(response.items)
 
 })
 .catch(console.error)
   return [];
 
 }
 ,[])

    return (
        <div>
        tasks
            
        </div>
    )
}

export default Tasks
