import React, { Component } from 'react';
import axios from 'axios';

class Chapter extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    //axios(`/projects/${this.props.projectData.id}/chapters/${this.props.chapter.id}`)
  }

  render() {
    return (
      <div className='chapter'>
        <p><span onClick={() => this.props.setChapterToShow(null)}>Chapters</span> > Chapter {this.props.chapter.chapter_number}: {this.props.chapter.title}</p> 
        <p>{this.props.chapter.content}</p> 
      </div>
    )
  }
}

export default Chapter;