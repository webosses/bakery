import React, { useState, useContext, useEffect } from 'react'
import * as contentful from "contentful"
import * as contentfulManager from "contentful-management"
import today,{tomorrow,yesterday} from "./util"

const AppContext = React.createContext()


const client = contentful.createClient({
  space:process.env.REACT_APP_SPACE_ID,
  accessToken:process.env.REACT_APP_ACCESS_TOKEN
})

const mclient = contentfulManager.createClient({
  accessToken:process.env.REACT_APP_MANAGE_TOKEN
});

//console.log('manage token',process.env.REACT_APP_MANAGE_TOKEN)




const categories = [
  "Pastery",
  "French Rolls",
  "French Bread",
  "Cookies",
  "Rolls",
  "Muffins",
  "Doughnuts"

]

const AppProvider = ({ children }) => {

  const [env,setEnv] = useState();

  const [products, setProducts] = useState([])//original data
  const [dailyProducts,setDailyProducts]=useState([])
  const [sortedProducts, setSortedProducts] = useState([])

  const [viewor, setViewor]=useState('editor')//printer, editor, baker
  const [selectedDay, setSelectedDay] = useState(today)
  const [sortKey, setSortKey] = useState('index')
  const [filterKeys, setFilterKeys] = useState({category:[],isdone:-1,instock:-1})
  const [hasTomorrowData,setHasTomorrowData] = useState(false)

  const getDailyProduct = (day)=>{
    return  products.filter(product=>new Date(product.date).toLocaleDateString()==day)
  }
// console.log('tomorrow',new Date(tomorrow))
  const copyProducts = ()=>{
    console.log(products)
    let tomorrowData = [];//to merge into products list using setProducts
    const todaysData = getDailyProduct(today);

    //for detect if all today's data copied to contentful
    const todaysDataLength = todaysData.length;
    const created = 0;

    todaysData.forEach(pro=>{
      let fields = {}
      let tomorrowDataItem = {}
      for(let [key,value] of Object.entries(pro)){
        //reset data
       
        if(key=='id')continue
        if(key=='date')value = new Date(tomorrow) ;
        if(key=='isDone')value=false ;
        if(key=='prepared')value = 0 ;
       
        tomorrowDataItem = {...tomorrowDataItem,[key]:value}
        fields = {...fields,[key]:{"en-US": value}}
        
      }
      tomorrowData =[...tomorrowData,tomorrowDataItem]

      // console.log('fields',fields)
        setTimeout(()=>{
          env.createEntry('bakeryProduct',{fields: fields})
      .then(product=>{
        created +=1;
       return product.publish()
      }) 
      .then(product=>console.log(product))
      .catch(console.error)

        },1000)

        if(created==todaysDataLength){
          setProducts(products=>{
            return [...products,...tomorrowData]
          })
         // setCopyCompleted(true)
        }
      
      //env createEntry
    })
   // console.log(todaysData);

  }

  


  //const [ isLoading, error,]
 const [isLoading,setIsLoading]=useState(true);
 const [error,setError]=useState({ show: false, msg: '' });
 
 const updateProductsList=(id,field,value)=>{
   const product = products.find(pro=>pro.id==id)
   product[field]=value;
   const temp = products.filter(p=>p.id!=id)
   setProducts([...temp,product])
 }

 const handleUpdate = (id,field,value)=>{
  env.getEntry(id).then(product=>{
    console.log(value)
   
      product.fields[field]['en-US'] = value;

      
    return product.update();
   
  })
  .then(product=>{
    updateProductsList(id,field,value)
   return product.publish()
    
      }
    )
  .then(product=>console.log(product))
  .catch(console.error)
     
     
 }

  const handleFilter = (keys)=>{
    setFilterKeys(()=>{
      return {...filterKeys,...keys}
    });
   
}



const filterProducts = ()=>{
	
		const {category,isdone,instock} = filterKeys;
		let tempProducts = [...dailyProducts];
   // console.log('before filter',tempProducts)

		if(category.length!==0){
       
			tempProducts = tempProducts.filter(product => {
        console.log('filter category',category,product.category)
         for(var i=0; i<category.length; i++){
                 if(category[i]===product.category){
                   return true;
                 }
         }
       return false;
       // category.includes(product.category)
      }
      );

      console.log('after filter category',tempProducts);

			
		}


    if(isdone != -1){
     // console.log('isdone',isdone)
      tempProducts = tempProducts.filter(product => {
       // console.log('pisdone',product.isDone,isdone)
        return product.isDone ==isdone

      } );
    }

    if(instock !==-1){
      tempProducts = tempProducts.filter(product => product.instock == instock);
    }

    //console.log('temppro',tempProducts)
	
		return setSortedProducts(()=>tempProducts);
	

}



  const sortByCategory=(products)=>{
   // console.log('before sort',products);
     products.sort((a,b)=>{
     const cA= a.category.toUpperCase();
     const cB = b.category.toUpperCase();
      if(cA<cB){
        return -1;
      }
      if(cA>cB){
       return 1;
     }
     return 0;
     
    })
    console.log('aftersort',products)
    return products;
  }

  const sortByTitle=(products)=>{
    products.sort((a,b)=>{
    const cA= a.title.toLowerCase();
    const cB = b.title.toLowerCase();
     if(cA<cB){
       return -1;
     }
     if(cA>cB){
      return 1;
    }
    return 0;
    
   })
  // console.log('aftersort',products)
   return products;
 }


  const sortByIndex=(products)=>{
    products.sort((a,b)=>{
      return a.index - b.index;
    })
    return products;
  }

  const sortProducts=(products)=>{
     let tempPro = [...products];//[...sortedProducts];
     if(tempPro.length==0)return [];

    switch(sortKey){

      case "category":
       tempPro =  sortByCategory(tempPro);
        break;

      case "index":
        tempPro=sortByIndex(tempPro) 
      break;   
      
      case "title":
       tempPro = sortByTitle(tempPro) 
      break;  

    }

    return tempPro;
     
  
  }

  const formateData =(items)=>{

    return items.map((item) => {
			// console.log(item);
			const id = item.sys.id;
		//	const images = item.fields.images.map(img => { return img.fields.file.url });
			return { ...item.fields,id};
		})
    

}
  
//  // const { isLoading, error, data: movies } = useFetch(`&s=${query}`)//
// //console.log(movies)
// useEffect(()=>{
//   // if(products.length>0){
//   //   localStorage.setItem('products', JSON.stringify(products));
//     setDayProducts(()=>{
//       return getDailyProduct(selectedDay);
//     })
//  // }

// },[selectedDay])



// useEffect(()=>{
//     setHasTomorrowData(()=>{
//       console.log(getDailyProduct(tomorrow));
//       return getDailyProduct(tomorrow).length>0

//     })
//   }
// ,[products])

// useEffect(() => {
//     if(products.length>0){
//     setSortedProducts(dayProducts);
//     setIsLoading(false);
//     }
  
//   }, [products]);

  const getLocalStorage = (name) => {
    let list = localStorage.getItem(name);
    if (list) {
      return  JSON.parse(localStorage.getItem(name));
    } else {
      return [];
    }
  };


//useEffects ****************
//set contentful manange api env
useEffect(async ()=>{
  const space =  await mclient.getSpace(process.env.REACT_APP_SPACE_ID)
  const env = await space.getEnvironment("master")
  setEnv(env)

},[])


//fetch products from contentful
useEffect(()=>{
   client.getEntries({
     limit:100,
     content_type:'bakeryProduct',
     order:'fields.index'
  })
.then(response=>{
     
   setProducts(()=>formateData(response.items))
   setIsLoading(false)
   // console.log(response.items)

})
.catch(console.error)
  return [];

}
,[])


//filter out daily data
useEffect(()=>{
    setHasTomorrowData(getDailyProduct(tomorrow).length>0)
    setDailyProducts(()=>{
      return getDailyProduct(selectedDay)
    })
  
  
},[selectedDay,products])

//sort product data by sortkey
useEffect(()=>{
  setSortedProducts(sortProducts(dailyProducts))

},[dailyProducts,sortKey])

//filter products by filterkeys
useEffect(()=>{
  // console.log(filterKeys)
filterProducts()

},[filterKeys])


//***end useEffect */

// useEffect(()=>{
  // const test = [
  //   {category:"paster",index:2},
  //   {category:"break",index:8},
  //   {category:"paster",index:3},
  //   {category:"break",index:9},
  //   {category:"break",index:1},
  // ]
   
  // ;

  // test.sort((a,b)=>{
  //  return a.category>b.category?1:(a.category<b.category?-1:0)
  // })
  // console.log('sorted test',test)

  //const tempPro=sortProducts()
  //if(tempPro.length>0){

    //setProducts(tempPro)
   // setSortedProducts(tempPro);
   // setIsLoading(false);

 // }
  
 // console.log(sortKey,'sorted')
//},[sortKey])

// useEffect(()=>{

  
//   setSortedProducts(()=>getDailyProduct(selectedDay))

// },[selectedDay])




  return (
    <AppContext.Provider value={{
      today,
      tomorrow,
      yesterday,
      hasTomorrowData,
    isLoading,
    error,
    selectedDay, 
    viewor,
     products,
     sortedProducts,
     categories,
     sortKey,
     filterKeys, 
     setSortKey,
     setFilterKeys,
     handleFilter,
     filterProducts,
     copyProducts,
     handleUpdate,
     setSelectedDay,
     setViewor,
     }}>
      {children}
    </AppContext.Provider>
  )
}

// make sure use,
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }


// useEffect(()=>{
//   let interval = setInterval(()=>{
//      // do something 
//    }),1000}
// return () => { clearInterval(interval) }
// }, [foo])