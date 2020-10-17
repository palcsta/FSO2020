import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import store from '../reducers/store'



const Notification = () => {
  const [content, setContent] = useState(useSelector(x => x).filter)
  const [hidden, setHidden] = useState(true)
  console.log("in noti: ", useSelector(x => x).filter)
  const dispatch = useDispatch()

  const notification = useSelector(x => x)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  store.subscribe(() => {
    console.log("after subscribe, ",store.getState())
    setHidden(false)
    setTimeout(() => {
      setHidden(true)
    }, 5000)
  })


  const message = () => {
    //notification==="NEW" ? setContent(notification.content) : setContent("voted")
    //console.log('print of useSelector ', ()=>useSelector(x => x))
    console.log("notification:: ",notification)
    return (<>{notification.filter==="NEW" ?
    "added: "+notification.anecdotes[notification.anecdotes.length-1].content :
     "voted"+store.getState()}</>)
  }
  

  return (
    <div hidden={hidden} style={style}>
      {/*notification.filter*/}
      {message()}
    </div>
  )
}

export default Notification