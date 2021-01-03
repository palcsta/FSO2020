
import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Col, Navbar, Nav, Form, Button } from 'react-bootstrap'
import axios from 'axios'
//import blogService from '../services/blogs'
const style = {
  color: "purple",
  background: "lightgrey",
  display: "",
  "borderStyle": "solid",
  "borderRadius": "20px",

};





const Blog = ({ blog, user }) => {
  const [info, setInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [likeButton, setLikeButton] = useState(false)
  const [comment, setComment] = useState(null)
  const [comments, setComments] = useState(blog.comments)

  const like = () => {
    setLikes(likes + 1)
    setLikeButton(!likeButton)
    blogService.update(blog._id, {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      comments: blog.comments

    })

  }


  const addComment = () => {
    blogService.update(blog._id, {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
      comments: [...blog.comments, comment]

    })
    setComments(comments.concat(comment))
    setComment("")

  }




  //console.log("blog comments",blog.comments)
  return (
    <div style={style}>





      <p>{blog.title}, <b>author:</b> {blog.author}<button onClick={() => setInfo(!info)}>info</button></p>
      {info ?
        <>

          <p>url: {blog.url}</p>
          <p>likes: {likes} <button disabled={likeButton} onClick={() => like()}>like!</button></p>
          <p>id: {blog._id}</p>

          {blog.comments.length !== 0 ? <>COMMENTS:<ul>{comments.map(x => <li>{x}</li>)}</ul></> : <>no comments</>}


          {user == null ? "" :
            <Form onSubmit={() => comment()}>
              <Form.Row>
                <Col sm={3} >
                  <Form.Control id="username"
                    placeholder="comment"
                    type="text"
                    value={comment}
                    name="Username"
                    onChange={({ target }) => setComment(target.value)}
                  />
                </Col>
                <Col >
                  <Button onClick={() => addComment(comment)}>Add comment!</Button>
                </Col>

              </Form.Row>



            </Form>


          }


          {user == null ? "" : <button onClick={() => blogService.remove(blog._id)}>remove a blog!</button>}

        </>
        : <></>}



    </div>
  )
}

export default Blog
