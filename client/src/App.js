import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import './App.css';

import Auth from './modules/Auth';

import Header from './components/Header';
import NavPane from './components/NavPane';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BookList from './components/BookList';
import ProjectList from './components/ProjectList';
import Dash from './components/Dash';




class App extends Component {
  constructor() {
    super();

    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldFireRedirect: false,
      //form fields
      registerUsername: '',
      registerPassword: '',
      registerEmail: '',
      registerName: '',
      loginUsername: '',
      loginPassword: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.resetFireRedirect = this.resetFireRedirect.bind(this);
  }

  // generic input change for form fields
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  // sends login request to server
  handleLoginSubmit(event) {
    event.preventDefault();
    axios.post('/login', {
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    }).then((res) => {
      console.log(res);
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          loginUsername: '',
          loginPassword: '',
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }     

  // sends new registration request to server
  handleRegisterSubmit(event) {
    event.preventDefault();
    axios.post('/users', {
      user: {
        username: this.state.registerUsername,
        password: this.state.registerPassword,
        email: this.state.registerEmail,
        name: this.state.registerName,
      }
    }).then((res) => {
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  // sends logout request to server
  logoutUser() {
    axios.delete('/logout', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
        loginUsername: '',
        loginPassword: '',
      });
    });
  }

  // resets redirect flag
  resetFireRedirect() {
    if (this.state.shouldFireRedirect) {
      this.setState({
        shouldFireRedirect: false,
      });
    };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <NavPane logoutUser={this.logoutUser} />
          <Route
            exact path="/login"
            render={() => 
              !this.state.auth ? (
                <LoginForm 
                  auth={this.state.auth} 
                  loginUsername={this.state.loginUsername} 
                  loginPassword={this.state.loginPassword} 
                  handleInputChange={this.handleInputChange}
                  handleLoginSubmit={this.handleLoginSubmit}
                />
              ) : (
                <Redirect to="/profile" />
              )}
          />
          <Route
            exact path="/register"
            render={() => 
              !this.state.auth ? (
                <RegisterForm
                  auth={this.state.auth} 
                  registerUsername={this.state.registerUsername} 
                  registerPassword={this.state.registerPassword} 
                  registerEmail={this.state.registerEmail}
                  registerName={this.state.registerName}
                  handleInputChange={this.handleInputChange}
                  handleRegisterSubmit={this.handleRegisterSubmit}
                />
              ) : (
                <Redirect to="/profile" />
              )}
          />
          <Route
            exact path="/profile"
            render={() => 
              this.state.auth ? <Dash auth={this.state.auth} resetFireRedirect={this.resetFireRedirect} /> : <Redirect to="/login" />}
          />
          <Route
            path="/books"
            render={() =>
              this.state.auth ? <BookList /> : <Redirect to="/login" />}
          />
          <Route
            exact path="/projects"
            render={() =>
              this.state.auth ? <ProjectList /> : <Redirect to="/login" />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
