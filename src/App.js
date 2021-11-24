import React from 'react'
import './App.css';


import {useGlobalContext} from './context';
import Editor from './pages/Editor';
import Printor from './pages/Printor';
import Baker from './pages/Baker';
import Views from './component/Viewors';
import Header from './component/Header';
import Loading from './component/Loading';
import Error from './component/Error';



function App() {
 
  const {viewor,setViewor,error,isLoading,selectedDay,yesterday,today,tomorrow} = useGlobalContext();
 

  if(isLoading) return <Loading/>

  return <>
    <div className={`App ${selectedDay==today?"today":selectedDay==tomorrow?"tomorrow":"yesterday"}`}>
      
    <Header/>
    
     <main>
     {error&&<Error msg={error.msg}/>}

      {viewor==='editor'&&<Editor/>}
      {viewor==='baker'&&<Baker/>}
      {viewor==='printor'&&<Printor/>}
      </main>

      <footer>
      <Views viewor={viewor} setViewor={setViewor}/>
      </footer>
   
    </div>
  </>
}

export default App;
