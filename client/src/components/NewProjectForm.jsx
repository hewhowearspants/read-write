import React from 'react';

const NewProjectForm = (props) => {
  return (
    <div className="projectcreateform">
      <form onSubmit={props.handleProjectSubmit}>
        <input
          type="text"
          name="projectTitle"
          value={props.projectTitle}
          placeholder="title"
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="projectSubtitle"
          value={props.projectSubtitle}
          placeholder="subtitle"
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="projectSynopsis"
          value={props.projectSynopsis}
          placeholder="synopsis"
          onChange={props.handleInputChange}
        />
        <div className='buttons'>
          <button className='submit-button' type="submit" title="Submit"><i className="fa fa-share" aria-hidden="true"></i></button>
          <button className='cancel-button' onClick={props.toggleCreateProject} title="Cancel"><i className="fa fa-times" aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  )
}

export default NewProjectForm;