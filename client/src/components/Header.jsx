import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Read/Write</h1>
        <p onClick={this.props.toggleNavPane} className={this.props.showNavPane ? "selected" : ""}><i className="fa fa-bars" aria-hidden="true"></i></p>
      </header>
    )
  }
}

export default Header;