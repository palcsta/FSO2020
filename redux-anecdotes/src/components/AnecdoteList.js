import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const voter = (id) => {
        const anecdoteToVote = props.anecdotes.find(n => n.id === id)
        anecdoteToVote.votes++
        props.filterChange('VOTE')
        props.vote(id)
        props.setNotification(`you voted '${anecdoteToVote.content}'`, 3)
    }
    return (
        <div>
            {props.anecdotes.sort((a, b) => {
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
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

export default connect(
    mapStateToProps,
    { vote, filterChange, setNotification },

)(AnecdoteList)