import React, { useState } from 'react'



const BlogForm = (props) => {
   /* const [newBlog, setNewBlog] = useState('')


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleChange = (event) => {
        setNewBlog(event.target.value)
    }
    const addBlog = (event) => {
        event.preventDefault()

        setNewBlog('')
    }
*/





    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <input
                    placeholder="title"
                    type="text"
                    value={props.title}
                    name="title"
                    onChange={props.handleTitleChange}
                />
            </div>
            <div>
                <input
                    placeholder="author"
                    type="text"
                    value={props.author}
                    name="author"
                    onChange={props.handleAuthorChange}
                />
            </div>
            <div>
                <input
                    placeholder="url"
                    type="text"
                    value={props.url}
                    name="url"
                    onChange={props.handleUrlChange}
                />
            </div>
            <button type="submit">Add a blog!</button>
        </form>)
}
export default BlogForm