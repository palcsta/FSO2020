import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
const style = { border: 'solid', padding: 10, borderWidth: 1 }

const Notification = () => {

  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  let timeoutID;
  const [shown, setShown] = useState(notifications[1] > 0)

  console.log(shown)
  if (notifications[1] > 0) {
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
      //setShown(false)
      console.log('setting timeout')
    }, notifications[1] * 1000)
  }

/*  if (notifications[1]==undefined) {
    console.log('noti[1]', notifications[1])
    clearTimeout(timeoutID)
   setTimeout(() => {
      dispatch(clearNotification())
     
      console.log('setting timeout')
    }, notifications[1] * 1000)

   
    console.log(timeoutID)
    console.log("timeid", timeoutID)
    console.log("time", notifications[1])
  }*/
  return (
    <div hidden={notifications[1] > 0 ? false : true
      //notifications[1] > 0 ? false : true
    } style={style} >
      {notifications[0]}
    </div>
  )
}

export default Notification