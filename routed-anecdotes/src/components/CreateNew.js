import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useField } from '../hooks'

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const handleSubmit = () => {
        //e.preventDefault()       
        props.addNew({ content: content.value, author: author.value, info: info.value, votes: 0 })
    }
    const reset = () => {
        info.clear()
        author.clear()
        content.clear()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
            <input {...content} />
                </div>
                <div>
                    author
            <input {...author} />
                </div>
                <div>
                    url for more info
            <input {...info} />
                </div>
                <button onClick={handleSubmit}><Link to="/">add</Link></button>

            </form>
            <button onClick={() => reset()}>reset</button>
        </div>
    )

}


export default CreateNew