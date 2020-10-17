
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' 
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'

const reducer = combineReducers({
  anecdotes : anecdoteReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools())


 // store.subscribe(() => console.log("in store: ",store.getState()))
  //store.dispatch(filterReducer('filter_reducerrr'))
  //store.dispatch(createNote('combineReducers forms one reduces from many simple reducers'))

export default store