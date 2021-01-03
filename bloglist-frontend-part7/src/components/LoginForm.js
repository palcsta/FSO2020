import React from 'react'
import PropTypes from 'prop-types'
import { Col, Navbar, Nav, Form, Button } from 'react-bootstrap'



const LoginForm = (props) => {
  return (
    <>

      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Col sm={3} >
            <Form.Control id="username"
              placeholder="username"
              type="text"
              value={props.username}
              name="Username"
              onChange={props.handleUsernameChange} />
          </Col>
          <Col controlId="formGridPassword" sm={3} >
            <Form.Control id="password"
              placeholder="password"
              type="password"
              value={props.password}
              name="Password"
              onChange={props.handlePasswordChange} />
          </Col>
          <Col >
            <Button id="login-button" type="submit">Login</Button>
          </Col>
          
        </Form.Row>



      </Form>

{/*
      <form onSubmit={props.handleSubmit}>
        <div>

          <input
            id="username"
            placeholder="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>

          <input
            id="password"
            placeholder="password"
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>*/}
    </>)
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}




export default LoginForm