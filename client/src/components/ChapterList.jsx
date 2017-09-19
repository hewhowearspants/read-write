import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';

import Chapter from './Chapter';
import ChapterEdit from './ChapterEdit';
import NewChapterForm from './NewChapterForm';

class ChapterList extends Component {
  constructor() {
    super();

    this.state = {
      chapterData: null,
      chapterDataLoaded: false,
      chapterToShow: null,
      chapterToEdit: null,
      creatingChapter: false,
      //form fields
      chapterNumber: '',
      chapterTitle: '',
      chapterContent: '',
    }
    
    this.setChapterToShow = this.setChapterToShow.bind(this);
    this.setChapterToEdit = this.setChapterToEdit.bind(this);
    this.toggleCreateChapter = this.toggleCreateChapter.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleChapterSubmit = this.handleChapterSubmit.bind(this);
    this.handleChapterEditSubmit = this.handleChapterEditSubmit.bind(this);
    this.deleteChapter = this.deleteChapter.bind(this);
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

  toggleCreateChapter() {
    this.setState((prevState) => {
      return {
        creatingChapter: !prevState.creatingChapter,
        chapterNumber: '',
        chapterTitle: '',
        chapterContent: '',
      }
    })
  }

  setChapterToShow(id) {
    const chapterData = this.state.chapterData.filter((chapter) => {
      return chapter.id === id;
    })[0];
    this.setState({
      chapterToShow: chapterData,
      chapterToEdit: null,
    })
  }

  setChapterToEdit(id) {
    const chapterData = this.state.chapterData.filter((chapter) => {
      return chapter.id === id;
    })[0];
    if (chapterData) {
      this.setState({
        chapterToEdit: chapterData,
        chapterNumber: chapterData.chapter_number,
        chapterTitle: chapterData.title,
        chapterContent: chapterData.content === null ? '' : chapterData.content,
      })
    } else {
      this.setState({
        chapterToEdit: null,
        chapterNumber: '',
        chapterTitle: '',
        chapterContent: '',
      })
    }
  }

  handleInputChange(event) {
    console.log(event.target);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleContentChange(value) {
    this.setState({
      chapterContent: value,
    })
  }

  handleChapterSubmit(event) {
    event.preventDefault();
    axios(`/projects/${this.props.projectData.id}/chapters`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        chapter: {
          chapter_number: this.state.chapterNumber,
          title: this.state.chapterTitle,
        }
      }
    }).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return {
          chapterData: prevState.chapterData.concat(res.data.chapter),
          chapterNumber: '',
          chapterTitle: '',
          creatingChapter: false,
        }
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  handleChapterEditSubmit() {
    axios(`/projects/${this.props.projectData.id}/chapters/${this.state.chapterToEdit.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        chapter: {
          chapter_number: this.state.chapterNumber,
          title: this.state.chapterTitle,
          content: this.state.chapterContent,
        }
      }
    }).then((res) => {
      console.log(res);
      const newChapterData = [...this.state.chapterData];
      newChapterData.forEach((chapter, index, array) => {
        if (chapter.id === res.data.chapter.id) {
          array[index] = res.data.chapter;
        }
      });
      this.setState({
        chapterData: newChapterData,
        chapterToShow: res.data.chapter,
      })
    }).catch((err) => {
      console.log(err);
    })
  }
  
  deleteChapter(id) {
    axios(`/projects/${this.props.projectData.id}/chapters/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      console.log(res);
      const newChapterData = [...this.state.chapterData];
      newChapterData.forEach((chapter, index, array) => {
        if (chapter.id === id) {
          array.splice(index, 1);
        }
      });
      this.setState({
        chapterData: newChapterData,
        chapterToShow: null,
        chapterToEdit: null,
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  renderChapters() {
    return this.state.chapterData.map((chapter) => {
      return (
        <div className='chapter-single' key={chapter.id} onClick={() => this.setChapterToShow(chapter.id)}>
          <p className='chapter-number'>{chapter.chapter_number}</p>
          <p className='chapter-title'>{chapter.title}</p>
        </div>
      )
    })
  }

  render() {
    return (
      !this.state.chapterToShow ? (
        <div className="chapter-list">
          {this.state.chapterDataLoaded ? this.renderChapters() : <p>Loading...</p>}
          {!this.state.creatingChapter ? (
            <div className='chapter-create-button' onClick={this.toggleCreateChapter}>
              <p>Add Chapter</p>
              <p>+</p>
            </div>
          ) : (
            <NewChapterForm toggleCreateChapter={this.toggleCreateChapter} handleInputChange={this.handleInputChange} handleChapterSubmit={this.handleChapterSubmit}/>
          )}
        </div>
      ) : (
        !this.state.chapterToEdit ? (
          <Chapter 
            projectData={this.props.projectData} 
            setChapterToShow={this.setChapterToShow} 
            setChapterToEdit={this.setChapterToEdit}
            deleteChapter={this.deleteChapter}
            chapter={this.state.chapterToShow} 
          />
        ) : (
          <ChapterEdit 
            setChapterToShow={this.setChapterToShow}
            setChapterToEdit={this.setChapterToEdit} 
            handleInputChange={this.handleInputChange} 
            handleContentChange={this.handleContentChange}
            handleChapterEditSubmit={this.handleChapterEditSubmit}
            chapterNumber={this.state.chapterNumber}
            chapterTitle={this.state.chapterTitle}
            chapterContent={this.state.chapterContent}
            chapter={this.state.chapterToEdit} 
          />
        )
      )
    )
  }
}

export default ChapterList;