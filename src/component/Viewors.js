import React from 'react'

function Views({viewor,setViewor}) {

    return (
        <div className="viewor_buttons nav">
            <button className={`btn_editor${viewor=='editor'&&' on'}`} onClick={(e)=>{
                setViewor('editor')
            }}>Editor</button>



<button className={`btn_editor${viewor=='baker'&&' on'}`} onClick={(e)=>{
                setViewor('baker')
            }}>Baker</button>
            

<button className={`btn_editor${viewor=='printor'&&' on'}`} onClick={(e)=>{
                setViewor('printor')
            }}>Printer</button>
            
        </div>
    )
}

export default Views
