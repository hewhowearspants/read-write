import React from 'react';

const ProjectSingle = (props) => {
  return (
    <div className={`project-${props.type}`}>
      <div className="project-single-top">
        <p>{props.project.title}</p>
        <p>{props.project.subtitle}</p>
      </div>
      <div className="project-single-bottom">
      </div>
    </div>
  )
}

export default ProjectSingle;