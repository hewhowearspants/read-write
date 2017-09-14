import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class LoginForm extends Component {
  render() {
    return (
      <div className="loginform">
        <form onSubmit={this.props.handleLoginSubmit}>
          <input
            type="text"
            name="loginUsername"
            value={this.props.loginUsername}
            placeholder="username"
            onChange={this.props.handleInputChange}
          />
          <input
            type="password"
            name="loginPassword"
            value={this.props.loginPassword}
            placeholder="password"
            onChange={this.props.handleInputChange}
          />
          <input type="submit" value="Log In" />
        </form>
        <p>Not registered? <Link to="/register">Join Us!</Link></p>
      </div>
    )
  }
}

export default LoginForm;