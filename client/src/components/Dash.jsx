import React, { Component } from 'react';

import axios from 'axios';

import Auth from '../modules/Auth';

// basic dashboard, displays users project and book counts
class Dash extends Component {
  constructor() {
    super();

    this.state = {
      userBooks: null,
      userProjects: null,
      username: null,
      userEmail: null,
      name: null,
    }
  }

  componentWillMount() {
    axios.get('/profile', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    })
    .then((res) => {
      this.setState({
        userBooks: res.data.books,
        userProjects: res.data.projects,
        username: res.data.user.username,
        userEmail: res.data.user.email,
        name: res.data.user.name
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className='dashboard'>
        {this.state.name ? (<h2>Hi there, {this.state.name}</h2>) : (<h2>Loading...</h2>)}
        {this.state.userBooks ? (<p>You have {this.state.userBooks.length} books in your list</p>) : ''}
        {this.state.userProjects ? (<p>You have {this.state.userProjects.length} projects in the works</p>) : ''}
      </div>
    )
  }
}

export default Dash