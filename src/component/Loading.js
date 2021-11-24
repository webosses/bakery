import React from 'react'
import Header from './Header'


function Loading() {
    return <>
    <Header/>
        <main>
        <div className="loading">
           <h1>Loading...</h1> 
        </div>
        </main>
    </>
}

export default Loading
