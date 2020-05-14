import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(({ notification }) => {
        return notification
    })

    if(notification === null || notification === '') {
        return null
    }

    const style = {
        border: 'solid',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        background: 'lightgrey'
    }

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification