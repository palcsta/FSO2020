import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { filterChange } from '../reducers/filterReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(filterChange('NEW'))

    dispatch(setNotification(`you created anecdote: ('${content}') `, 3))
    /*setTimeout(() => {
      dispatch(clearNotification())

    }, 1 * 1000)*/
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewAnecdote
/*

import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/filterReducer'





const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const [newAnecdote, setNewAnecdote] = useState("")

    const handleNewSearched = (event) => {
        console.log("event ", event)

        event.preventDefault()
        setNewAnecdote(event.target.value)


    }
    const create = (content) => {
        dispatch(createAnecdote(content))


    }



    return (
        <div>
            <form onSubmit={newAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>

            <h2>create new</h2>
            <form>
                <div><input value={newAnecdote} onChange={handleNewSearched} /></div>

            </form>
            <button onClick={() => {
                create(newAnecdote)
                setNewAnecdote('')
                dispatch(filterChange('NEW'))
            }}>create</button>



        </div>
    )
}

export default AnecdoteForm

*/

