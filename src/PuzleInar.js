import React from 'react'

function PuzleInar({item, dragStartHandler }) {

    function dragEndHandler(e) {
        e.target.style.background = '#94d2bd'
    }
    
    return (
        <div 
            className="item"
            draggable={item.muveble}
            onDragStart={e => dragStartHandler(e, item)}
            onDragEnd={e => dragEndHandler(e)}
            style={item.muveble ? {background: '#94d2bd', cursor: 'pointer'} : {background: '#0a9396'}}
        >{item.num}</div>
    )
}

export default PuzleInar
