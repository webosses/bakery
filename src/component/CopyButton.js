import React from 'react'

function CopyButton({title,handler,disabled}) {
    return (
        <div>
            <button disabled={disabled} onClick={handler} className="btn btn_primary btn_add">{title}</button>
        </div>
    )
}

export default CopyButton
