
import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {


  switch (action.type) {    
    case 'NEW':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    case 'VOTE':

      const anecdoteToVote = state.find(n => n.id === action.data.id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes++
      }
      state.map(x => x.id !== action.data.id ? x : changedAnecdote)
      return state.map(x => x.id !== action.data.id ? x : changedAnecdote)

    default:
      return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}




export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }

}




export const vote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)

    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
  }


}


export default reducer