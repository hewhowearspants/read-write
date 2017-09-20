import React, { Component } from 'react';
import ReactQuill from 'react-quill';

// chapter edit contains the Quill text editor for writing project chapters. this is the meaty part.
class ChapterEdit extends Component {
  render() {
    return (
      <div className='chapter-edit'>
        <p className='chapter-header'><span className='chapters-link' onClick={() => this.props.setChapterToShow(null)}>Chapters</span> > 
           Chapter <input className='chapter-number-input' type='text' name='chapterNumber' value={this.props.chapterNumber} placeholder='#' onChange={this.props.handleInputChange}/>
           : <input className='chapter-title-input' type='text' name='chapterTitle' value={this.props.chapterTitle} placeholder='title' onChange={this.props.handleInputChange}/>
        </p>
        <ReactQuill value={this.props.chapterContent} onChange={this.props.handleContentChange} />
        <div className='buttons'>
          <button className='submit-button' onClick={this.props.handleChapterEditSubmit} title="Save">
            <i className="fa fa-floppy-o" aria-hidden="true"></i>
          </button>
          <button className='cancel-button' onClick={() => this.props.setChapterToEdit(null)} title="Back">
            <i className="fa fa-reply" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default ChapterEdit;