import React, { useState, useEffect ,useContext} from 'react'
import './App.css';


import {AppContext,useGlobalContext} from './context';
import Editor from './pages/Editor';
import Printor from './pages/Printor';
import Baker from './pages/Baker';
import Views from './component/Viewors';
import Header from './component/Header';



function App() {
 
  const {sortedProducts,viewor,setViewor} = useContext(AppContext);//useGlobalContext();
 
  console.log('app.js',sortedProducts);

  return <>
    <div className="App">
      
    <Header/>
    
     <main>
      {viewor=='editor'&&<Editor/>}
      {viewor=='baker'&&<Baker/>}
      {viewor=='Printor'&&<Printor/>}
      </main>

      <footer>
      <Views viewor={viewor} setViewor={setViewor}/>
      </footer>
   
    </div>
  </>
}

export default App;
