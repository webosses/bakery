let today = new Date()
today.setHours(0,0,0,0)
let tomorrow = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
let yesterday = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)

tomorrow = tomorrow.toLocaleDateString();
yesterday = yesterday.toLocaleDateString();
today = today.toLocaleDateString();
export default today
export {tomorrow,yesterday}