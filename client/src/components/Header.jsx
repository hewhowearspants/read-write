import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Read/Write</h1>
        <p onClick={this.props.toggleNavPane}>NavPane</p>
      </header>
    )
  }
}

export default Header;