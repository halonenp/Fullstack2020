
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message
        case 'CLEAR_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

var time;

export const setNotification = (message, timeout) => {

    return async dispatch => {
        await dispatch({
            type: 'SET_NOTIFICATION',
            data: { message }
        })
        clearTimeout(time)
        time = setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
                data: ''
            })
        }, (timeout * 1000))
    }
}

export default notificationReducer