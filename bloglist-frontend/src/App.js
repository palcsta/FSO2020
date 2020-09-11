import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'




const App = () => {
  const [blogs, setBlogs] = useState([])
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
    <Togglable buttonLabel='login'>
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
      <BlogForm   createBlog={addBlog} />)
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

  return (
    <div>
      <Notification message={successMessage} />
      <Notification message={errorMessage} />

      {user === null ? loginForm() :
        <><p>User <b>{user.name}</b> logged in <button onClick={logout}>log out</button></p>
          {blogForm()}</>}



      {blogs.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      }).map(blog => <Blog key={blog.id} blog={blog} />

      )}



    </div>
  )

}
export default App