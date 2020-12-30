import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useField, useRm } from '../hooks'

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const handleSubmit = () => {
        //e.preventDefault()       
        props.addNew({ content: content.value, author: author.value, info: info.value, votes: 0 })
    }
    const reset = () => {
        info.reset()
        author.reset()
        content.reset()
        

    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
            <input {...content} reset={0}  />
                </div>
                <div>
                    author
            <input {...author}  reset={0}/>
                </div>
                <div>
                    url for more info
            <input {...info}  reset={0}/>
                </div>
                <button onClick={handleSubmit}><Link to="/">add</Link></button>

            </form>
            <button onClick={() => reset()}>reset</button>
        </div>
    )

}


export default CreateNew