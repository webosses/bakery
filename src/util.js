let today = new Date()
today.setHours(0,0,0,0)
let tomorrow = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
let yesterday = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
console.log("yesterday from before localstrin",new Date(yesterday))
const dayBefore=(date)=>{
   
   console.log('date',date.getMonth())
   return new Date(date.getFullYear(),date.getMonth(),date.getDate()-1)
  
}
////tomorrow = tomorrow.toLocaleDateString();
//yesterday = yesterday.toLocaleDateString();
//today = today.toLocaleDateString();

console.log("yesterday from after localstrin",new Date(yesterday))

export default today
export {tomorrow,yesterday,dayBefore}