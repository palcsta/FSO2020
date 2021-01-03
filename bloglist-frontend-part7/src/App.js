import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { Col, Navbar, Nav, Form, Button } from 'react-bootstrap'
//import {Nav} from 'react-bootstrap/Nav'
//import { Form } from 'react-bootstrap/Form'


const App = () => {
  const [blogs, setBlogs] = useState([{"_id":"5a422aa71b54a676234d17f8","title":"Go To Statement Considered Harmful","author":"Edsger W. Dijkstra","url":"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html","likes":6,"comments":["cool", "I like it!"]}])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //const [wantBlog, setWantBlog] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginService = async credentials => {
    const response = await axios.post("/api/login", credentials)
    console.log('response------', response)
    console.log('response data:-----', response.data)
    return response.data
  }


  const loginForm = () => (
    <Togglable buttonLabel='sign in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  const blogForm = () => (
    <BlogForm createBlog={addBlog} />)
  /*const blogForm = () => (<>
    {wantBlog ?
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={addBlog} />
      : <button onClick={() => setWantBlog(!wantBlog)}>Create a blog!</button>
    }</>)
*/
  const addBlog = (blogObject) => {

    try {
      blogService
        .create(blogObject)
        .then(returned => {
          setBlogs(blogs.concat(returned))

        })

      setSuccessMessage('Successfully added blog: ' + blogObject.title)
      //  setWantBlog(!wantBlog)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (e) {
      setErrorMessage("adding blog failed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    // event.preventDefault()
    //window.localStorage.removeItem('loggedUser')

    //or more powerful: 
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.clear()
  }


  const padding = {
    paddingRight: 5
  }
  const footer = {
    padding: "2px",
    border: "3px solid #4CAF50",
    background: "cyan"
  }

  return (
    <div class="container" >
      <Notification message={successMessage} />
      <Notification message={errorMessage} />

      <Router>
        <div style={footer}>
          {user === null ? loginForm() :
            <><> <Form.Row>User:(<b>{user.name}</b>) logged in
                <Col >
                <Button onClick={logout}>Logout</Button>
              </Col></Form.Row>
            </>
              {blogForm()}</>}
        </div>

        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/"><i>Menu</i></Navbar.Brand>
          <Nav className="mr-auto">
            <Link style={padding} to="/users"> users </Link>
            <Link style={padding} to="/blogs"> blogs </Link>
            {/*<Nav.Link to="/blogs">blogs</Nav.Link>*/}
          </Nav>
        </Navbar>



        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs">
            {blogs !== [] ? blogs.sort((a, b) => {
              if (a.likes < b.likes) {
                return 1;
              }
              if (a.likes > b.likes) {
                return -1;
              }
              return 0;
            }).map(blog => <p><Blog user={user} key={blog.id} blog={blog} /></p>

            ) : "no blogs"}
          </Route>

        </Switch>
        <p><a style={footer} href="https://fullstackopen.com">(FullStackOpen 2020 course)</a></p>
      </Router>



    </div>
  )

}
export default App