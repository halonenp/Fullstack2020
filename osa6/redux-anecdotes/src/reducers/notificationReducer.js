const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.text
        default:
            return state
    }
}

export const setNotification = (text) => {
    return {
        type: 'SET_NOTIFICATION',
        text
    }
}

export default notificationReducer