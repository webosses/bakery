import React, { useState, useContext, useEffect } from 'react'
import * as contentful from "contentful"
import * as contentfulManager from "contentful-management"
import today,{tomorrow,yesterday,dayBefore} from "./util"

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


const initFilter = ()=>{
  return {category:[],isdone:-1,instock:-1,iswrap:-1,name:""}
}

const AppProvider = ({ children }) => {

  const [env,setEnv] = useState();

  const [products, setProducts] = useState([])//original data
  const [dailyProducts,setDailyProducts]=useState([])
  const [sortedProducts, setSortedProducts] = useState([])

  const [viewor, setViewor]=useState('editor')//printor, editor, baker
  const [selectedDay, setSelectedDay] = useState(today)
  const [sortKey, setSortKey] = useState('index')
  const [filterKeys, setFilterKeys] = useState(initFilter())
  const [hasTomorrowData,setHasTomorrowData] = useState(false)
  const [bakerProducts,setBakerProducts] = useState([])
  const [authenticated,setAuthenticated] = useState(false)


// const handleBakerProducts=(id,value)=>{
//   let temp;
//   if(value>0){
//     temp = [...bakerProducts,dailyProducts.find(p=>p.id===id)]

//     }else{
//        temp = bakerProducts.filter(p=>p.id!==id)
//     }
//     setBakerProducts(temp)
  
// }

const authenticateUser = ()=>{
   return 
}

const logout = ()=>{
  localStorage.removeItem("user")
  setAuthenticated(false)
}

const login=(username,password)=>{
  client.getEntries({
    content_type: 'user',
  'fields.username[match]': username,
  'fields.password[match]': password,
  include: 1,
limit:1})
  .then(entry=>{
     if(entry.items.length>0){
       const user=entry.items[0];
      setLocalStorage("user",{name:user.fields.username,token:user.sys.id})
      setAuthenticated(true)
     }
  })
  .catch(console.error)
}

const hasAccessToken = ()=>{

  const user =getLocalStorage('user'); 
  if(!user)return false;
  client.getEntry(user.token)
  .then(()=>setAuthenticated(true))
  .catch(console.error)

}


useEffect(()=>{
  console.log(
    'effect token'
  )
  hasAccessToken()
},[])

  const getDailyProduct = (day)=>{
    const len=products.length;
  //  console.log(products)
     if(len==0)return [];


     return  products.filter(product=>{
       const pdate = new Date(product.date).toLocaleDateString()
       const cdate = new Date(day).toLocaleDateString()
       //console.log(pdate,cdate,"pdate,cdate")
       //console.log(day,product.date)
       return pdate===cdate;
      }
       )
        

  }

  
const getBakerProducts = ()=>{
  console.log(sortKey,'sortkey')
  return dailyProducts.filter(p=>p.required>0);
 //return sortProducts(getDailyProduct(selectedDay).filter(p=>p.required>0))
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
  const origin = viewor==="editor"?dailyProducts:getBakerProducts()
	
		const {category,isdone,instock,iswrap,name} = filterKeys;

		let tempProducts = [...origin];
 //  console.log('before filter',tempProducts)
  // const ptn = new RegExp('cookie')

   if(name.length>0){
     console.log(`.*${name}.*`,'pattern')
       const pattern = new RegExp(`.*${name}.*`,'i')
       console.log('name',name)
       console.log(tempProducts,'before name filter')

    tempProducts = tempProducts.filter(product => {
    //  console.log(pattern.test(product.title),'test',product.title)
return  pattern.test(product.title)
//console.log(test)
// if(test===true){
//   console.log(product,'product true')
// }

     // category.includes(product.category)
    }
  
    );

    // console.log('after filter name',tempProducts);

    
  }

		if(category.length!==0){
       
			tempProducts = tempProducts.filter(product => {
        // console.log('filter category',category,product.category)
         for(var i=0; i<category.length; i++){
                 return category[i]===product.category
                
         }
       return false;
       // category.includes(product.category)
      }
      );

      // console.log('after filter category',tempProducts);

			
		}


    if(isdone != -1){
      // console.log('isdone',isdone)
      tempProducts = tempProducts.filter(product => {
       // console.log('pisdone',product.isDone,isdone)
        return product.isDone == isdone

      } );
    }

    if(iswrap != -1){
      // console.log('iswrap',iswrap)
      // console.log(tempProducts)
      tempProducts = tempProducts.filter(product => {
        const check = product.iswrap==iswrap
        // console.log(check)
        // console.log('piswrap',iswrap,product.iswrap,check)
        return check

      } );
    }

    if(instock !=-1){
      tempProducts = tempProducts.filter(product => product.instock ==instock);
    }

    // console.log('temppro',tempProducts)
	
		return  tempProducts
	

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
    // console.log('aftersort',products)
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
    let tempPro = [...products]
    // let tempPro = viewor==="editor"?[...dailyProducts]:[...getBakerProducts()];//[...sortedProducts];
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

  const setLocalStorage=(name,data)=>{

    localStorage.setItem(name,JSON.stringify(data))
       
  }

  const getLocalStorage = (name) => {
    let data = localStorage.getItem(name);
    if (data) {
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
     limit:200,
     content_type:'bakeryProduct',
     order:'-fields.date,fields.index'
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
 // console.log(selectedDay,"day changed")
    setFilterKeys(()=>initFilter())
    setDailyProducts(()=>{
      return getDailyProduct(selectedDay)
    })
  
  
},[selectedDay])//products

useEffect(()=>{
  // console.log(sortKey,'product updating',products)
    setHasTomorrowData(getDailyProduct(tomorrow).length>0)
    setDailyProducts(()=>{
      return getDailyProduct(selectedDay);
    })
  
},[products])//products




useEffect(() => {

  if(viewor==="baker"){
    setSortKey('category')
   } else{
    setSortKey('index')
   }
  
}, [viewor])

//sort product data by sortkey
useEffect(()=>{
 
  setSortedProducts(()=>sortProducts(filterProducts()))

},[sortKey])//dailyP

useEffect(()=>{
    setSortedProducts(()=>sortProducts(filterProducts()))
    // console.log(filterKeys)

},[filterKeys])

useEffect(()=>{
   setSortedProducts(()=>{
    return sortProducts(filterProducts());
   })
},[dailyProducts])

// useEffect(()=>{

//   if(viewor==='editor'){
//     setSortedProducts(()=>dailyProducts)

//   }else{
//     setSortedProducts(getBakerProducts())
//   }
//  // console.log("baker products",getBakerProducts())
//   // setBakerProducts(()=>getBakerProducts())
// },[dailyProducts])

//filter products by filterkeys



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
      dailyProducts,
    isLoading,
    error,
    selectedDay, 
    viewor,
     products,
     sortedProducts,
     categories,
     sortKey,
     filterKeys, 
     env,
     bakerProducts,
     authenticated,
     sortProducts,
     setSortKey,
     setFilterKeys,
     handleFilter,
     filterProducts,
     handleUpdate,
     setSelectedDay,
     setViewor,
     getDailyProduct,
     setProducts,
     setBakerProducts,
     initFilter,
     login,
     logout,
    //  handleBakerProducts,
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