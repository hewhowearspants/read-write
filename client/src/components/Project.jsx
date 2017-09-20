import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Auth from '../modules/Auth';

import ProjectNav from './ProjectNav';
import ChapterList from './ChapterList';
import CharLocList from './CharLocList';

// this component holds all of the project information (synopis, chapters, characters, locations)
// user chooses what to see based on a nav bar
class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // vvvvv sets which project info component to display
      currentPage: 'synopsis',
      projectData: null,
      projectDataLoaded: false,
      fieldToEdit: '',
      //form fields
      title: '',
      subtitle: '',
      synopsis: '',
    }

    // method binders
    this.setPage = this.setPage.bind(this);
    this.setFieldToEdit = this.setFieldToEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormFieldSubmit = this.handleFormFieldSubmit.bind(this);
  }

  // loads individual project info on load
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

  // sets the component to be displayed
  setPage(name) {
    this.setState({
      currentPage: name,
    })
  }

  // sets which field is being edited, user can edit individual form fields for general project info (title, synopsis, etc)
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

  // generic form input change method
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  // updates project data for individual form fields
  handleFormFieldSubmit() {
    // this feels vaguely unnatural
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
            {/* TITLE: DISPLAY OR EDIT */}
            <h3><Link to='/projects'>Projects</Link> > {this.state.fieldToEdit !== 'title' ? (
              <span>
                {this.state.projectData.title}
                <span className='edit-field-button' onClick={() => this.setFieldToEdit('title')}> 
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </span>
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
                  <span className='edit-field-button' onClick={() => this.setFieldToEdit('subtitle')}> 
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </span>
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
            {/* nav bar component for display different project components */}
            <ProjectNav setPage={this.setPage} currentPage={this.state.currentPage} />
            {/* below is a sort of router */}
            {this.state.currentPage === 'synopsis' ? (
              this.state.fieldToEdit !== 'synopsis' ? (
                <p className='synopsis'>{this.state.projectData.synopsis}<span className='edit-field-button' onClick={() => this.setFieldToEdit('synopsis')}><i className="fa fa-pencil" aria-hidden="true"></i></span></p> 
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