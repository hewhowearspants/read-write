import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Auth from '../modules/Auth';
import BookSingle from './BookSingle';
import Book from './Book';
import NewBookForm from './NewBookForm';


class BookList extends Component {
  constructor() {
    super();

    this.state = {
      bookData: null,
      bookDataLoaded: false,
      booksRead: false,
      bookToShow: null,
      bookToEdit: null,
      creatingBook: false,
      //form fields
      bookTitle: '',
      bookAuthor: '',
      bookDescription: '',
      bookGenre: '',
      bookYear: '',
      bookImage: '',
    }

    this.toggleBooksRead = this.toggleBooksRead.bind(this);
    this.setBookToShow = this.setBookToShow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBookSubmit = this.handleBookSubmit.bind(this);
    this.toggleCreateBook = this.toggleCreateBook.bind(this);
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

  toggleCreateBook() {
    this.setState((prevState) => {
      return {
        bookTitle: '',
        bookAuthor: '',
        bookDescription: '',
        bookGenre: '',
        bookYear: '',
        bookImage: '',
        creatingBook: !prevState.creatingBook
      }
    })
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
  handleBookSubmit(event) {
    event.preventDefault();
    axios('/books', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        book: {
          title: this.state.bookTitle,
          author: this.state.bookAuthor,
          description: this.state.bookDescription,
          genre: this.state.bookGenre,
          year: this.state.bookYear,
          image_url: this.state.bookImage,
        }
      }
    }).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return {
          bookData: prevState.bookData.concat(res.data.book),
          bookTitle: '',
          bookAuthor: '',
          bookDescription: '',
          bookGenre: '',
          bookYear: '',
          bookImage: '',
          creatingBook: false,
        }
      });
    }).catch((err) => {
      console.log(err);
    });
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
        {!this.state.creatingBook ? (
          <div className='book-create-button' onClick={this.toggleCreateBook}>
          <p>Add A Book</p>
          <p>+</p>
        </div>
        ) : (
          <NewBookForm 
            handleInputChange={this.handleInputChange} 
            handleBookSubmit={this.handleBookSubmit}
            toggleCreateBook={this.toggleCreateBook} 
            bookTitle={this.state.bookTitle}
            bookAuthor={this.state.bookAuthor}
            bookDescription={this.state.bookDescription}
            bookGenre={this.state.bookGenre}
            bookYear={this.state.bookYear}
            bookImage={this.state.bookImage}
          />
        )}
      </div>
    )
  }
}

export default BookList;