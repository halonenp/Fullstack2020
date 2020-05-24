import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'


const Notification = () => {
    const notification = useSelector(({ notification }) => {
        return notification
    })

    if (notification === null || notification === '') {
        return null
    }

    /*const style = {
        border: 'solid',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        background: 'lightgrey'
    }*/

    return (
        <div className="container">
            <Alert variant="secondary">
                {notification}
            </Alert>

        </div>
    )
}

export default Notification