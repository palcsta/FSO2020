import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/filterReducer'

import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const voter = (id) => {
        dispatch(filterChange('VOTE'))
        const anecdoteToVote = anecdotes.find(n => n.id === id)
        anecdoteToVote.votes++
        dispatch(vote(id))
        dispatch(setNotification(`you voted '${anecdoteToVote.content}'`, 3))
        
      /*  setTimeout(() => {
            dispatch(clearNotification())

        }, 1 * 1000)*/

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
            )
            }


        </div>
    )
}

export default AnecdoteList 