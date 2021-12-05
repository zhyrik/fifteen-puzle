import React, {useState, useEffect } from 'react'

import './Field.css'
import { initArray, changeFlags, mixFields, checkResult } from './FieldLogick'
import Puzle from './Puzle'

export default function Ev() {
    const [field, setField] = useState(initArray())
    const [remember, setRemember] = useState({num: 16, muveble: false})
    const [win, setWin] = useState(false)
    
    // DND event handlers 
    function handleStart() {
        setField(state => mixFields(state))
        setField(state => changeFlags(state))
        setWin(false)
    }
    function dragStartHandler(e, r) {
        setRemember(r)
        e.target.style.background = '#005f73'
    }
    function dropHandler(e) {
        e.preventDefault()
        setField(state => handleMuvebleFlag(state))
        setField(state => changeFlags(state))
    }
    
    const handleMuvebleFlag = state => (state.map((item) => {
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
        </div>
        <div className="fields">
           {field.map((item) => (
               <Puzle item={item} dropHandler={dropHandler} dragStartHandler={dragStartHandler}/>
           ))} 
        </div>
        <div>{
            win ? <h2>You Win</h2> : <h2>Move tiles in grid to order them from 1 to 15. To move a tile you can drag and drop of it</h2>
        }</div>
    </div>
    )
}