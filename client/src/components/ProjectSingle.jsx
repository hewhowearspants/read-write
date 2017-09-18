import React from 'react';

import { Link } from 'react-router-dom';

const ProjectSingle = (props) => {
  return (
    <div className={`project-${props.type}`}>
      <div className="project-single-top">
        <p>{props.project.title}</p>
        <p>{props.project.subtitle}</p>
      </div>
      <div className="project-single-bottom">
        <Link to={`/projects/${props.project.id}`}>Open</Link>
      </div>
    </div>
  )
}

export default ProjectSingle;