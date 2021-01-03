import React, { useState } from 'react'
import { Col, Navbar, Nav, Form, Button } from 'react-bootstrap'

/*<form id='formi' onSubmit={addBlog}>

                    <input
                        id='title'
                        placeholder="title"
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleTitleChange}
                    />


                    <input
                        id='author'
                        placeholder="author"
                        type="text"
                        value={author}
                        name="author"
                        onChange={handleAuthorChange}
                    />


                    <input
                        id='url'
                        placeholder="url"
                        type="text"
                        value={url}
                        name="url"
                        onChange={handleUrlChange}
                    />

                    <button id="add_blog" type="submit">Add a blog!</button>
                </form>
                <button onClick={() => setWantBlog(!wantBlog)}>Cancel!</button></>*/


const BlogForm = ({ createBlog }) => {

    const [wantBlog, setWantBlog] = useState(false)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            author: author,
            title: title,
            url: url,
            comments: []

        })
        setWantBlog(!wantBlog)
        setTitle("")
        setAuthor("")
        setUrl("")
    }


    return (<>

        {wantBlog ?
            <Form onSubmit={addBlog}>
                <Form.Row>
                    <Col sm={3} >
                        <Form.Control id='title'
                            placeholder="title"
                            type="text"
                            value={title}
                            name="title"
                            onChange={handleTitleChange} />
                    </Col>
                    <Col sm={3} >
                        <Form.Control id='author'
                            placeholder="author"
                            type="text"
                            value={author}
                            name="author"
                            onChange={handleAuthorChange} />
                    </Col>
                    <Col sm={3} >
                        <Form.Control id='url'
                            placeholder="url"
                            type="text"
                            value={url}
                            name="url"
                            onChange={handleUrlChange} />
                    </Col>
                    <Col >
                        <Button id="add_blog" type="submit">Add a blog!</Button>
                    </Col>
                    <Col >
                        <Button onClick={() => setWantBlog(!wantBlog)}>Cancel!</Button>
                    </Col>
                </Form.Row>

            </Form> :
            <button onClick={() => setWantBlog(!wantBlog)}>Create a blog!</button>}

    </>)
}
export default BlogForm
