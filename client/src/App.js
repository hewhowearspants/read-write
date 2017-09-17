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
import BookSearch from './components/BookSearch';
import ProjectList from './components/ProjectList';
import Dash from './components/Dash';
import Footer from './components/Footer';


class App extends Component {
  constructor() {
    super();

    this.state = {
      auth: Auth.isUserAuthenticated(),
      redirect: null,
      showNavPane: false,
      bookSearchData: null,
      //form fields
      registerUsername: '',
      registerPassword: '',
      registerEmail: '',
      registerName: '',
      loginUsername: '',
      loginPassword: '',
      bookQuery: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.resetRedirect = this.resetRedirect.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
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

  searchBooks(event) {
    event.preventDefault();
    axios('/books/search', {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        book: {
          query: this.state.bookQuery
        }
      }
    }).then((res) => {
      console.log(res);
      const results = res.data.data.items;
      const bookSearchData = [];
      let searchId = 1;
      for (let book of results) {
        bookSearchData.push({
          search_id: searchId,
          title: book.volumeInfo.title ? book.volumeInfo.title : null,
          author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : null,
          year: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.slice(0,4) : null,
          genre: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : null,
          short_description: book.searchInfo ? book.searchInfo.textSnippet : null,
          description: book.volumeInfo.description ? book.volumeInfo.description : null,
          image_url: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null, 
        })
        searchId++;
      }
      this.setState({
        bookSearchData: bookSearchData,
        bookQuery: '',
        redirect: '/books/search',
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  setRedirect(path) {
    this.setState({
      redirect: path,
    });
  }

  // resets redirect flag
  resetRedirect() {
    if (this.state.redirect) {
      this.setState({
        redirect: null,
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
            exact path="/books"
            render={() =>
              this.state.auth ? <BookList setRedirect={this.setRedirect} /> : <Redirect to="/login" />}
          />
          <Route
            exact path="/books/search"
            render={() =>
              this.state.auth ? <BookSearch bookSearchData={this.state.bookSearchData} setRedirect={this.setRedirect} /> : <Redirect to="/login" />}
          />
          <Route
            exact path="/projects"
            render={() =>
              this.state.auth ? <ProjectList /> : <Redirect to="/login" />}
          />
          <Footer 
            bookQuery={this.state.bookQuery} 
            handleInputChange={this.handleInputChange} 
            searchBooks={this.searchBooks} 
          />
          {this.state.redirect ? <Redirect to={this.state.redirect} /> : ''}
        </div>
      </Router>
    );
  }
}

export default App;
