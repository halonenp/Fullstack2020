import React from 'react'

const Message = ({ message }) => {
    if (message === null)
        return null
    return (
        <p className="message">
            {message}
        </p>
    )
}

export default Message