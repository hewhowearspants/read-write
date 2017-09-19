import React, { Component } from 'react';

class Chapter extends Component {
  render() {
    return (
      <div className='chapter'>
        <p className='chapter-header'><span onClick={() => this.props.setChapterToShow(null)}>Chapters</span> > Chapter {this.props.chapter.chapter_number}: {this.props.chapter.title}</p> 
        <div className='chapter-content' dangerouslySetInnerHTML={{ __html: this.props.chapter.content}} /> 
        <div className='buttons'>
          <button onClick={() => this.props.setChapterToEdit(this.props.chapter.id)}>Edit</button>
          <button onClick={() => this.props.deleteChapter(this.props.chapter.id)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Chapter;