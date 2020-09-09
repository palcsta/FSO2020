import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = (props) => {
    return (
      <>
     
      <form onSubmit={props.handleSubmit}>
        <div>
          
            <input
            placeholder="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          
            <input
            placeholder="password"
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
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