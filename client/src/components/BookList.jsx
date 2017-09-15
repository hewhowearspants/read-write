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
    }
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
    return this.state.bookData.map((book) => {
      return (
        <BookSingle type="list" book={book} key={book.id} />
      )
    })
  }

  render() {
    return (
      <div className='booklist'>
        {(this.state.bookDataLoaded ? this.showBooks() : <p>Loading...</p>)}
      </div>
    )
  }
}

export default BookList;