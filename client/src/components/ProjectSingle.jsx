import React from 'react';

import { Link } from 'react-router-dom';

// project list display component, with link to open project
const ProjectSingle = (props) => {
  return (
    <div className={`project-single`}>
      <div className="project-single-top">
        <p className='project-title'>{props.project.title}</p>
        <p className='project-subtitle'>{props.project.subtitle}</p>
      </div>
      <div className="project-single-bottom">
        <Link to={`/projects/${props.project.id}`}><i className="fa fa-folder-open" aria-hidden="true" title="Open Project"></i></Link>
      </div>
    </div>
  )
}

export default ProjectSingle;