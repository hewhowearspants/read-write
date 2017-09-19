import React, { Component } from 'react';

class Chapter extends Component {
  render() {
    return (
      <div className='chapter'>
        <p className='chapter-header'><span onClick={() => this.props.setChapterToShow(null)}>Chapters</span> > Chapter {this.props.chapter.chapter_number}: {this.props.chapter.title}</p> 
        <div className='chapter-content' dangerouslySetInnerHTML={{ __html: this.props.chapter.content}} /> 
        <div className='buttons'>
          <button className='edit-button' onClick={() => this.props.setChapterToEdit(this.props.chapter.id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button className='delete-button' onClick={() => this.props.deleteChapter(this.props.chapter.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </div>
      </div>
    )
  }
}

export default Chapter;