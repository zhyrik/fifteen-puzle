# Fifteen puzle game

[Demo]( https://zhyrik.github.io/fifteen-puzle/).


## example code in one file
```
import React, {useState, useEffect } from 'react'

import './Field.css'
import { initArray, changeFlags, mixFields, checkResult } from './FieldLogick'

export default function Ev() {
    const [field, setField] = useState(initArray())
    const [remember, setRemember] = useState({num: 16, muveble: false})
    const [win, setWin] = useState(false)
    
    //! DND event handlers 
    function handleStart() {
        setField(state => mixFields(state))
        setField(state => changeFlags(state))
        setWin(false)
    }
    function dragStartHandler(e, r) {
        setRemember(r)
        e.target.style.background = '#005f73'
    }
    function dragLiveHandler(e) {
        e.target.style.background = 'white'
    }
    function dragEndHandler(e) {
         e.target.style.background = '#94d2bd'
    }
    function dragOverhandler(e) {
        e.preventDefault()
        e.target.style.background = '#ee9b00'
    }
    function dropHandler(e, n) {
        e.preventDefault()
        setField(state => muveBlock(state))
        setField(state => changeFlags(state))
    }



    // main logick
    const muveBlock = state => (state.map((item) => {
        if (item.num === 16) {
            return remember
        } else if (item.num === remember.num) {
            return {num: 16, muveble: false}
        }
        else {
            return item
        }
    }))
    
    useEffect(() => {
        setField(state => mixFields(state))
        setField(state => changeFlags(state))
        
    }, [])
    // check result game
    useEffect(() => {
        let checkFlag = checkResult(field)
        if (checkFlag) {
            setWin(checkFlag)
        }

    }, [field])

    
    return (
    <div className="wrapper">
        <div className="button-wrapper"> 
            <button onClick={handleStart}>restart</button>
            {console.log("div")}
        </div>
        <div className="fields">
           {field.map((item) => (
               <>
               
               {item.num === 16 ? 
               <div 
                    className="field-item"
                    key={item.num}
                    onDrop={e=> dropHandler(e, item.num)}
                    onDragOver={e => dragOverhandler(e)}
                    onDragLeave={e => dragLiveHandler(e)}
               >
                   {item.num < 16 ? <div 
                                        className="item"
                                        draggable={item.muveble}
                                        onDragStart={e => dragStartHandler(e, item)}
                                        onDragEnd={e => dragEndHandler(e)}
                                        style={item.muveble ? {background: '#94d2bd', cursor: 'pointer'} : {background: '#0a9396'}}
                                    >{item.num}</div> : null }
               </div> :
               <div 
                    className="field-item"
                    key={item.num}
                >
                    {item.num < 16 ? <div 
                                        className="item"
                                        draggable={item.muveble}
                                        onDragStart={e => dragStartHandler(e, item)}
                                        onDragEnd={e => dragEndHandler(e)}
                                        style={item.muveble ? {background: '#94d2bd', cursor: 'pointer'} : {background: '#0a9396'}}
                                    >{item.num}</div> : null }
                </div> 
                }
                </>
           ))} 
        </div>
        <div>{
            win ? <h2>You Win</h2> : <h2>Move tiles in grid to order them from 1 to 15. To move a tile you can drag and drop of it</h2>
        }</div>
    </div>
    )
}
```