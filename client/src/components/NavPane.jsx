import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

// this is the nav pane that slides out
class NavPane extends Component {
  render() {
    return (
      <nav className={!this.props.showNavPane ? 'closed' : ''}>
        <ul>
          {!Auth.isUserAuthenticated() ? (
            <ul>
              <li onClick={this.props.toggleNavPane}><Link to="/login">Login</Link></li>
            </ul>
          ) : (
            <ul>
              <li onClick={this.props.toggleNavPane}><Link to="/profile">Dash</Link></li>
              <li onClick={this.props.toggleNavPane}><Link to="/books">Read</Link></li>
              <li onClick={this.props.toggleNavPane}><Link to="/projects">Write</Link></li>
              <li className="logout" onClick={() => {this.props.logoutUser(); this.props.toggleNavPane()}}>Logout</li>
            </ul>
          )}
        </ul>
      </nav>
    )
  }
}

export default NavPane;