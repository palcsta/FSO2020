/*
import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import store from '../reducers/store'
import { setNotification } from '../reducers/anecdoteReducer'

const style = {  border: 'solid',  padding: 10,  borderWidth: 1}
const Notification = () => {
  const [hidden, setHidden] = useState(true)
  const dispatch = useDispatch()
  const notification = useSelector(x => x)

  //setTimeout(() => {
    store.subscribe(() => {
      setHidden(false)
      console.log("noti in noti: ",notification)
      setTimeout(() => {
        setHidden(true)
        //dispatch(setNotification("lol"))
      }, 5000)
    })
  //}, 1000)
  

  return (
    <div hidden={hidden} style={style}>
      {notification.filter}
    </div>
  )
}

export default Notification*/



import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const style = { border: 'solid', padding: 10, borderWidth: 1 }


const Notification = () => {
  const [hide, setHidden] = useState(true)
  const dispatch = useDispatch()

  const notifications = useSelector(state => state.notifications)
  //console.log("notifications: ",notifications)
  /*console.log('in Noti noti: ', notifications)
  const anecdotes = useSelector(state => state.anecdotes)
  console.log('in Noti anecdotes: ', anecdotes)
*/
  console.log(notifications[1])
  if (notifications[1] > 0) {
  
    setTimeout(() => {
      dispatch(clearNotification())
    }, notifications[1] * 1000)
  }


  return (
    <div hidden={notifications[1]>0 ? false : true} style={style} >
      {notifications[0]}
    </div>
  )
}

export default Notification