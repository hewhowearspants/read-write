import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';

import ProjectNav from './ProjectNav';
import ChapterList from './ChapterList';
import CharLocList from './CharLocList';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'synopsis',
      projectData: null,
      projectDataLoaded: false,
      fieldToEdit: '',
      //form fields
      title: '',
      subtitle: '',
      synopsis: '',
    }

    this.setPage = this.setPage.bind(this);
    this.setFieldToEdit = this.setFieldToEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormFieldSubmit = this.handleFormFieldSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.routeProps.match.params.id);
    axios.get(`/projects/${this.props.routeProps.match.params.id}`, {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      console.log(res.data);
      this.setState({
        projectData: res.data.project,
        projectDataLoaded: true,
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  setPage(name) {
    this.setState({
      currentPage: name,
    })
  }

  setFieldToEdit(fieldName) {
    if(fieldName) {
      this.setState({
        fieldToEdit: fieldName,
        [fieldName]: this.state.projectData[fieldName],
      })
    } else {
      this.setState({
        fieldToEdit: null,
        [fieldName]: '',
      })
    }
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormFieldSubmit() {
    let dataToUpdate = this.state[this.state.fieldToEdit];
    axios(`/projects/${this.state.projectData.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        project: {
          [this.state.fieldToEdit]: dataToUpdate,
        }
      }
    }).then((res) => {
      console.log(res);
      this.setState({
        projectData: res.data.project,
        [this.state.fieldToEdit]: '',
        fieldToEdit: null,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className='project-wrapper'>
        {this.state.projectDataLoaded ? (
          <div className='project'>
            <h3>Projects > {this.state.fieldToEdit !== 'title' ? (
              <span>
                {this.state.projectData.title}
                <span onClick={() => this.setFieldToEdit('title')}> Edit</span>
              </span>
             ) : (
               <span>
                <input
                  type='text'
                  name='title'
                  value={this.state.title}
                  placeholder='title'
                  onChange={this.handleInputChange}
                />
                <span onClick={() => this.setFieldToEdit(null)}>No</span>
                <span onClick={() => this.handleFormFieldSubmit()}>OK</span>
               </span>
             )}
            </h3>
            {/* SUBTITLE: DISPLAY OR EDIT */}
            <h4>
              {this.state.fieldToEdit !== 'subtitle' ? (
                <span>
                  {this.state.projectData.subtitle}
                  <span onClick={() => this.setFieldToEdit('subtitle')}> Edit</span>
                </span>
              ) : (
                <span>
                  <input
                    type='text'
                    name='subtitle'
                    value={this.state.subtitle}
                    placeholder='subtitle'
                    onChange={this.handleInputChange}
                  />
                  <span onClick={() => this.setFieldToEdit(null)}>No</span>
                  <span onClick={() => this.handleFormFieldSubmit()}>OK</span>
                </span>
             )}
            </h4>
            <ProjectNav setPage={this.setPage} currentPage={this.state.currentPage} />
            {this.state.currentPage === 'synopsis' ? (
              this.state.fieldToEdit !== 'synopsis' ? (
                <p className='synopsis'>{this.state.projectData.synopsis}<span onClick={() => this.setFieldToEdit('synopsis')}> Edit</span></p> 
              ) : (
                <span>
                  <input
                    type='text'
                    name='synopsis'
                    value={this.state.synopsis}
                    placeholder='synopsis'
                    onChange={this.handleInputChange}
                  />
                  <span onClick={() => this.setFieldToEdit(null)}>No</span>
                  <span onClick={() => this.handleFormFieldSubmit()}> OK</span>
                </span>
              )
            ) : (
              ''
            )}
            {this.state.currentPage === 'chapters' ? <ChapterList projectData={this.state.projectData} /> : ''}
            {this.state.currentPage === 'characters' ? <CharLocList type="character" projectData={this.state.projectData} /> : ''}
            {this.state.currentPage === 'locations' ? <CharLocList type="location" projectData={this.state.projectData} /> : ''}
          </div>
        ) : (
          <div className='project'>
            <h3>Projects > Loading...</h3>
          </div>
        )}
      </div>
    )
  }
}

export default Project;