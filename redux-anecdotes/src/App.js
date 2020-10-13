/*//import { render } from '@testing-library/react'
import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { createAnecdote, vote } from './reducers/anecdoteReducer'
import  AnecdoteForm  from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'




const App = () => {

  const anecdotes = useSelector(state => state)
  
  const dispatch = useDispatch()

  const voter = (id) => {
    const anecdoteToVote = anecdotes.find(n => n.id === id)
    const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes++
    }

    console.log("App:20:voter method: ", dispatch(vote(id)))


}

  return (
    <>
     <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => {
                if (a.votes < b.votes) {
                    return 1;
                }
                if (a.votes > b.votes) {
                    return -1;
                }
                return 0;
            }).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voter(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <AnecdoteForm />
            <AnecdoteList />
    </>
  )
}

export default App*/




import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
