import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { filterChange } from '../reducers/filterReducer'

const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.filterChange('NEW')
    props.setNotification(`you created anecdote: ('${content}') `, 3)
  }
  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}
export default connect(
  null,
  { createAnecdote, filterChange, setNotification },

)(NewAnecdote)