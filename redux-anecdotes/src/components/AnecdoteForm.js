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