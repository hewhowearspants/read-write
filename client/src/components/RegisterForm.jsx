import React, { Component } from 'react';

class RegisterForm extends Component {
  render() {
    return (
      <div className="registerform">
        <form onSubmit={this.props.handleRegisterSubmit}>
          <input
            type="text"
            name="registerUsername"
            value={this.props.registerUsername}
            placeholder="username"
            onChange={this.props.handleInputChange}
          />
          <input
            type="password"
            name="registerPassword"
            value={this.props.registerPassword}
            placeholder="password"
            onChange={this.props.handleInputChange}
          />
          <input
            type="email"
            name="registerEmail"
            value={this.props.registerEmail}
            placeholder="email"
            onChange={this.props.handleInputChange}
          />
          <input
            type="text"
            name="registerName"
            value={this.props.registerName}
            placeholder="name"
            onChange={this.props.handleInputChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default RegisterForm;