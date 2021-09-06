import React from 'react'
import style from './ColorBatch.module.css'

function ColorBatch(props) {
    const Color = props.color;
    return (
        
            <div className={`${style['batch-body']}`} style={{backgroundColor: Color}}></div>
    
    )
}

export default ColorBatch
