import React, { Component } from 'react';

import axios from 'axios';
import Auth from '../modules/Auth';
import ProjectSingle from './ProjectSingle';

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
        {this.state.projectDataLoaded ? this.renderProjects() : <p>Loading...</p>}
      </div>
    )
  }
}

export default ProjectList