import React, { Component } from 'react';

import axios from 'axios';
import Auth from '../modules/Auth';
import ProjectSingle from './ProjectSingle';
import NewProjectForm from './NewProjectForm';

// displays list of projects, as well as lets user add new project
class ProjectList extends Component {
  constructor() {
    super();

    this.state = {
      projectData: null,
      projectDataLoaded: false,
      creatingProject: false,
      // form fields
      projectTitle: '',
      projectSubtitle: '',
      projectSynopsis: '',
    }

    this.toggleCreateProject = this.toggleCreateProject.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
  }

  // gets list of projects on load
  componentWillMount() {
    axios.get('/projects', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      this.setState({
        projectData: res.data.projects,
        projectDataLoaded: true
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  // toggles create new project form
  toggleCreateProject() {
    this.setState((prevState) => {
      return {
        projectTitle: '',
        projectSubtitle: '',
        projectSynopsis: '',
        creatingProject: !prevState.creatingProject,
      }
    })
  }

  // generic form input change method
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  // sends project create request to server
  handleProjectSubmit(event) {
    event.preventDefault();
    axios('/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        project: {
          title: this.state.projectTitle,
          subtitle: this.state.projectSubtitle,
          synopsis: this.state.projectSynopsis,
        }
      }
    }).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return {
          projectData: prevState.projectData.concat(res.data.project),
          projectTitle: '',
          projectSubtitle: '',
          projectSynopsis: '',
          creatingProject: false,
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  // displays list of projects
  renderProjects() {
    return this.state.projectData.map((project) => {
      return <ProjectSingle type="list" project={project} key={project.id} />
    })
  }

  render () {
    return (
      <div className="projectlist">
        <h2>Projects</h2>
        {this.state.projectDataLoaded ? this.renderProjects() : <p>Loading...</p>}
        {!this.state.creatingProject ? (
          <div className='project-create-button' onClick={this.toggleCreateProject}>
            <p>New Project</p>
            <p>+</p>
          </div>
        ) : (
          <NewProjectForm
            handleInputChange={this.handleInputChange}
            handleProjectSubmit={this.handleProjectSubmit}
            toggleCreateProject={this.toggleCreateProject}
            projectTitle={this.state.projectTitle}
            projectSubtitle={this.state.projectSubtitle}
            projectSynopsis={this.state.projectSynopsis}
          />
        )}
      </div>
    )
  }
}

export default ProjectList