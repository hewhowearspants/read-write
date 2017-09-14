import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

class NavPane extends Component {
  render() {
    return (
      <nav>
        <ul>
          {!Auth.isUserAuthenticated() ? (<li><Link to="/login">Login</Link></li>) : (<li className="logout" onClick={this.props.logoutUser}>Logout</li>)}
        </ul>
      </nav>
    )
  }
}

export default NavPane;