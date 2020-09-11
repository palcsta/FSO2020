
import React, { useState } from 'react'
import blogService from '../services/blogs'

const style = {
  color: "purple",
  background: "lightgrey",
  display: "",
  "borderStyle": "solid",
  "borderRadius": "20px",

};


const Blog = ({ blog }) => {
  const [info, setInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [likeButton, setLikeButton] = useState(false)

  const like = () => {
    setLikes(likes + 1)
    setLikeButton(!likeButton)
    blogService.update(blog._id, {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1

    })

  }

  return (
    <div style={style}>
      <p>{blog.title}, <b>author:</b> {blog.author}<button onClick={() => setInfo(!info)}>info</button></p>
      {info ?
        <>

          <p>url: {blog.url}</p>
          <p>likes: {likes} <button disabled={likeButton} onClick={() => like()}>like!</button></p>
          <p>id: {blog._id}</p>
          <button onClick={() => blogService.remove(blog._id)}>remove a blog!</button>
        </>
        : <></>}



    </div>
  )
}

export default Blog
