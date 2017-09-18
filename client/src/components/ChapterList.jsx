import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';

class ChapterList extends Component {
  constructor() {
    super();

    this.state = {
      chapterData: null,
      chapterDataLoaded: false,
    }
  }

  componentDidMount() {
    axios.get(`/projects/${this.props.projectData.id}/chapters`, {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      console.log(res.data);
      this.setState({
        chapterData: res.data.chapters,
        chapterDataLoaded: true,
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  renderChapters() {
    return this.state.chapterData.map((chapter) => {
      return (
        <div className='chapter-single' key={chapter.id}>
          <p>{chapter.chapter_number}</p>
          <p>{chapter.title}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="chapter-list">
        {this.state.chapterDataLoaded ? this.renderChapters() : <p>Loading...</p>}
        <div className='chapter-create-button'>
          <p>Add Chapter</p>
          <p>+</p>
        </div>
      </div>
    )
  }
}

export default ChapterList;