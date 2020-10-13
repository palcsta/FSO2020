//import { render } from '@testing-library/react'
import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { createAnecdote, vote } from '../reducers/anecdoteReducer'




const AnecdoteForm = ()  => {

    const anecdotes = useSelector(state => state)
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

           
            <h2>create new</h2>
            <form>
                <div><input value={newAnecdote} onChange={handleNewSearched} /></div>

            </form>
            <button onClick={() => {
                create(newAnecdote)
                setNewAnecdote('')
            }}>create</button>



        </div>
    )
}

export default AnecdoteForm