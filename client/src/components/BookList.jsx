import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Auth from '../modules/Auth';
import BookSingle from './BookSingle';
import Book from './Book';


class BookList extends Component {
  constructor() {
    super();

    this.state = {
      bookData: null,
      bookDataLoaded: false,
      booksRead: false,
      bookToShow: null,
    }

    this.toggleBooksRead = this.toggleBooksRead.bind(this);
    this.setBookToShow = this.setBookToShow.bind(this);
  }

  componentDidMount() {
    axios.get('/books', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      this.setState({
        bookData: res.data.books,
        bookDataLoaded: true,
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  showBooks() {
    const booksToShow = this.state.bookData.filter((book) => {
      if (book.read === this.state.booksRead) {
        return book;
      }
    });

    if (this.state.booksRead && booksToShow.length === 0) {
      return <p>You haven't read any books!</p>
    } else if (!this.state.booksRead && booksToShow.length === 0) {
      return <p>You have no books to read!</p>
    } else {
      return booksToShow.map((book) => {
        return (
          <div className='book-single-container' key={book.id}>
            <BookSingle type="list" book={book} setBookToShow={this.setBookToShow} bookToShow={this.state.bookToShow} />
            {this.state.bookToShow === book.id ? <Book book={book} /> : ''}
          </div>
        )
      })
    }
  }

  setBookToShow(id) {
    if (id !== this.state.bookToShow) {
      this.setState({
        bookToShow: id
      })
    } else {
      this.setState({
        bookToShow: null
      })
    }
  }

  toggleBooksRead() {
    this.setState((prevState) => {
      return {
        booksRead: !prevState.booksRead,
        bookToShow: null
      }
    })
  }

  render() {
    return (
      <div className='booklist'>
        <div className='book-read-toggle'>
          <p>
            <span style={!this.state.booksRead ? {color:"red"} : {color:""}}>Unread </span> 
            <span onClick={this.toggleBooksRead}>-X-</span>
            <span style={this.state.booksRead ? {color:"red"} : {color:""}}> Read</span>
          </p>
        </div>
        {(this.state.bookDataLoaded ? this.showBooks() : <p>Loading...</p>)}
        <div className='book-create-button'>
          <p>Add A Book</p>
          <p>+</p>
        </div>
      </div>
    )
  }
}

export default BookList;