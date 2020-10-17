

import React, { useEffect } from 'react'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'


import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import store from './reducers/store'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])


  //store.subscribe(() => console.log("in APP store.getstate", store.getState()))
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification /*msg={"messsage"} time={0}*/ />
      <NewAnecdote />
      <AnecdoteList />
    </div>
  )
}

export default App
