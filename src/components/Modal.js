import React from 'react'
import {useState, useEffect} from 'react'

import './css/Modal.css'

function Modal(props) {
    const {visible} = props

    let [visibleClass, setVisibleClass] = useState('hidden')

    useEffect(() => {
        visible ? setVisibleClass('visible') : setVisibleClass('hidden')
    }, [visible])

    return (
        <div className={`modal ${visibleClass}`}>
            {props.children}
        </div>
    )
}

export default Modal