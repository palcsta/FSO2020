import React, { useState } from 'react'
import {
    useParams
  } from "react-router-dom"

  const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id == id)
  
  
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>has {anecdote.votes} votes</div>
        <div> {anecdote.info==undefined ? "no info" : <a href={anecdote.info}>more info </a>}</div>
  
      </div>
    )
  }

export default Anecdote