

import anecdoteService from '../services/anecdotes'

import Notification from '../components/Notification'

const notificationReducer = (state = [], action) => {


    switch (action.type) {
        case 'NOTI':
                        
            return [action.data, action.time]
        case 'OFF':
            state=[]
            return state
        default:
            return state
    }

}
export const setNotification = (content, time) => {
    return async dispatch => {

        dispatch({
            type: 'NOTI',
            data: content,
            time: time
        })

    }
}
export const clearNotification = () => {
    return async dispatch => {

        dispatch({
            type: 'OFF',
            data: "",
            time: 0
        })
    }
}


export default notificationReducer