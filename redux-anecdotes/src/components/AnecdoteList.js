import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  vote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/filterReducer'



const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()




    const voter = (id) => {
        const anecdoteToVote = anecdotes.find(n => n.id === id)
        dispatch(filterChange('VOTE'))
        anecdoteToVote.votes++
        console.log("App:20:voter method: ", dispatch(vote(id)))


    }

    return (
        <div>

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


        </div>
    )
}

export default AnecdoteList 