import React, { Component } from 'react';

import axios from 'axios';
import Auth from '../modules/Auth';
import ProjectSingle from './ProjectSingle';
import NewProjectForm from './NewProjectForm';

class ProjectList extends Component {
  constructor() {
    super();

    this.state = {
      projectData: null,
      projectDataLoaded: false,
    }
  }

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