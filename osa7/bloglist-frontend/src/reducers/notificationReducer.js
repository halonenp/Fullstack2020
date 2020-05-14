const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const setNotification = (notification, timeOut) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: ''
            })
        }, timeOut * 1000)

    }
}

export default notificationReducer