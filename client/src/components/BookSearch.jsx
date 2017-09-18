import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';

import BookSearchSingle from './BookSearchSingle.jsx';
import BookSearchSingleInfo from './BookSearchSingleInfo';

class BookSearch extends Component {
  constructor() {
    super();

    this.state = {
      bookToShow: null,
    }
    this.setBookToShow = this.setBookToShow.bind(this);
    this.addBookToList = this.addBookToList.bind(this);
  }

  componentWillMount() {
    this.props.setRedirect(null);
  }

  setBookToShow(id) {
    console.log(id);
    if (id) {
      this.setState({
        bookToShow: id,
      })
    } else {
      this.setState({
        bookToShow: null,
      })
    }
  }

  addBookToList(id) {
    let bookToPost = {};
    this.props.bookSearchData.forEach((book) => {
      if(book.search_id === id) {
        bookToPost = book;
      };
    })
    axios('/books', {
      method: "POST",
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        book: {
          title: bookToPost.title,
          author: bookToPost.author,
          description: bookToPost.description,
          genre: bookToPost.genre,
          year: bookToPost.year,
          image_url: bookToPost.image_url
        }
      }
    }).then((res) => {
      console.log(res);
      this.props.setRedirect('/books');
    })
  }

  showSearchResults() {
    return this.props.bookSearchData.map((book) => {
      return (
        <div className='book-single-container' key={book.search_id}>
          <BookSearchSingle type="list" auth={this.props.auth} book={book} bookToShow={this.state.bookToShow} setBookToShow={this.setBookToShow} addBookToList={this.addBookToList} />
          {this.state.bookToShow === book.search_id ? <BookSearchSingleInfo book={book} /> : ''}
        </div>
      )
    })
  }
  
  render() {
    return (
      <div className='book-search-results'>
      {this.props.bookSearchData ? this.showSearchResults() : <p>"Loading..."</p>}
      </div>
    )
  }
}

export default BookSearch;