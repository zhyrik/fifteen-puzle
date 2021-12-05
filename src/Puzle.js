import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PuzleInar from './PuzleInar'

export class Puzle extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        dropHandler: PropTypes.func.isRequired,
        dragStartHandler: PropTypes.func.isRequired
    }
    

    dragLiveHandler (e) {
        e.target.style.background = 'white'
    }

    dragOverhandler(e) {
        e.preventDefault()
        e.target.style.background = '#ee9b00'
    }
    shouldComponentUpdate(nextProps, nextState) {
        // render oprimization
        if( nextProps.item.num === 16 || 
            this.props.item.num ===16 || 
            this.props.item.muveble || 
            nextProps.item.muveble ||
            nextProps.item.num !== this.props.item.num
        ){
            return true
        } else {
            return false
        }
    }

    render() {
        const {item, dropHandler, dragStartHandler} = this.props
        console.log('render', item.num)
        return (
            <>
                {item.num === 16 ? 
                   <div 
                        className="field-item"
                        key={item.num}
                        onDrop={e=> dropHandler(e, item.num)}
                        onDragOver={e => this.dragOverhandler(e)}
                        onDragLeave={e => this.dragLiveHandler(e)}
                   >
                       {item.num < 16 ? <PuzleInar item={item} dragStartHandler={dragStartHandler}/> : null }
                   </div> :
                   <div 
                        className="field-item"
                        key={item.num}
                    >
                        {item.num < 16 ? <PuzleInar item={item} dragStartHandler={dragStartHandler}/>: null }
                    </div> 
                    }
            </>
        )
    }
}

export default Puzle
